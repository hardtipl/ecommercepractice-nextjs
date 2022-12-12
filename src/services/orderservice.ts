import Orders from '../dbmodels/orders'
import Products from '../dbmodels/Productsupdates'
import Orderlog from '../dbmodels/orderlog'
import Quantity from '../dbmodels/quantity'
import "../Dbconfig"
import mongoose from 'mongoose'
import { ordernotregistered, productorderfails } from '../utils/applicationsvarialbes'
export interface createorderuses {
    Productlist: Array<productorder>,
    Vendorinfo: {
        _id: string
    },
}

interface productorder {
    Qty: number,
    Productid: string
}
export const Createorderser = async (params: createorderuses) => {
    const session = await mongoose.startSession()
    await session.startTransaction()
    let createproductidbson: Array<any> = []
    let notavailablequantity = []
    let productdetails = []
    let createproductdetails = []
    for (const productid of params.Productlist) {
        mongoose.set("debug", true)
        const updatequantity = new Quantity({
            Reason: "Product Ordered",
            Productid: productid.Productid,
            Productquantity: productid.Qty,
            Operation: "Sub"
        })
        const clearingquantity = await updatequantity.save({ session })
        createproductidbson.push(new mongoose.Types.ObjectId(productid.Productid))
    }
    try {
        mongoose.set("debug", true)
        const passingaddtocart = await Products.aggregate([
            {
                $match: {
                    _id: {
                        $in:
                            createproductidbson
                    }
                }
            },
            {
                $lookup: {
                    as: "Productsqunatity",
                    from: "quantities",
                    localField: "_id",
                    foreignField: "Productid"
                }
            },
            { $unwind: "$Productsqunatity" },
            {
                $group: {
                    _id: {
                        Productid: "$Productsqunatity.Productid",
                        Productprice: "$Productprice",
                        Productname: "$Productname",
                        Productdiscountprice: "$Productdiscountprice",
                        Productopertaions: "$Productsqunatity.Operation"
                    },
                    qunatity: { $sum: "$Productsqunatity.Productquantity" }
                }
            },
            {
                $sort: {
                    "_id.Productid": 1
                }
            }
        ])
        for (const h of params.Productlist) {
            let tempcreateobj = {
                Availablequnatity: 0,
                Productdiscountprice: 0,
                Productprice: 0,
                orderquantity: 0,
                Productid: "",
                Productname: ""
            }
            tempcreateobj.Productid = h.Productid
            const uniqueproductids = passingaddtocart.filter((j: any) => {
                if (h.Productid == j._id.Productid) return j._id.Productid
                console.log("here is the something", h.Productid, j._id.Productid, h.Productid == j._id.Productid)
            })
            const soemepeops = uniqueproductids.map((l: any) => {
                if (l._id.Productopertaions == "Add") {
                    tempcreateobj.Availablequnatity = l.qunatity
                    tempcreateobj.Productdiscountprice = l._id.Productdiscountprice
                    tempcreateobj.Productname = l._id.Productname
                    tempcreateobj.Productprice = l._id.Productprice
                }
                else if (l._id.Productopertaions == "Sub") {
                    tempcreateobj.orderquantity = l.qunatity
                    tempcreateobj.Productdiscountprice = l._id.Productdiscountprice
                    tempcreateobj.Productname = l._id.Productname
                    tempcreateobj.Productprice = l._id.Productprice
                }
            })
            let checkisexits = h.Qty < (tempcreateobj.Availablequnatity - tempcreateobj.orderquantity)
            createproductdetails.push({
                Qty: h.Qty,
                Productdetails: {
                    Productname: tempcreateobj.Productname,
                    Productprice: tempcreateobj.Productprice,
                    Discountprice: tempcreateobj.Productdiscountprice
                },
                Subtotal: h.Qty * tempcreateobj.Productdiscountprice
            })
            productdetails.push({ "Productid": h.Productid, "Qty": h.Qty, Subtotal: h.Qty * tempcreateobj.Productdiscountprice })
            if (!checkisexits) {
                notavailablequantity.push(tempcreateobj.Productid)
            }
        }
        if (notavailablequantity.length > 0) {
            throw new Error(`Order Quantity is not available for Productids ${notavailablequantity}`)
        }
        const createorderinsertdb = new Orders({
            Productslist: productdetails,
            Customerid: params.Vendorinfo._id,
            
        })
        const storingorder = await createorderinsertdb.save()
        const createorderlog = new Orderlog({
            Productslist: createproductdetails,
            Orderid: storingorder._id
        })
        const hereisconfirmorderlog = await createorderlog.save()
        await session.commitTransaction()
        return `Order Confirmed`
    }
    catch (e: any) {
        await session.abortTransaction()
        console.log("main functino abort transaction ", e)
        if (e == productorderfails) {
            throw ordernotregistered
        }
        throw e.message
    }
    finally {
        await session.endSession()
    }
}
export const Orderhistoryser = async (userinfo: any) => {
    try {
        const fetchingorderhistory = await Orderlog.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "Orderid",
                    foreignField: "_id",
                    as: "Orderdetails"
                }
            },
            {
                $match: {
                    "Orderdetails.Vendorid": new mongoose.Types.ObjectId(userinfo._id)
                }
            },
            {
                $limit: 10
            }
        ])
        return fetchingorderhistory
    }
    catch (e) {
        throw e
    }
}