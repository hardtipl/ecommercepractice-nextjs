// import mongoose from "mongoose"
// import "../Dbconfig"
// // import Products from '../dbmodels/products'
// import Quantity from '../dbmodels/quantity'
// import { datanotfoundindb, datanotfoundmessage, serverdownerror } from "../utils/applicationsvarialbes"
// export interface productadduses {
//     Productprice: number
//     Productshortdescription: string
//     Productlongdescription: string
//     Productdiscountprice: number
//     Productname: string
//     Productvendorid: string
//     Category?: Array<string>
//     Productquantity: number
// }
// export interface productuptuses {
//     Productname?: string
//     Productshortdescription?: string
//     Productlongdescription?: string
//     Productprice?: number
//     Productdiscountprice?: number
//     Isactive?: boolean
//     Productid?: string,
//     Category?: Array<string>
// }
// export interface productfetchsingle {
//     Productid: string
// }
// export interface productgetall {
//     offset?: string
//     category?: string
// }
// export const Productaddser = async (params: productadduses) => {
//     const session = await mongoose.startSession()
//     try {
//         await session.startTransaction()
//         const newproductadd = new Products({
//             Productprice: params.Productprice,
//             Productshortdescription: params.Productshortdescription,
//             Productlongdescription: params.Productlongdescription,
//             Productdiscountprice: params.Productdiscountprice,
//             Productname: params.Productname,
//             Vendorid: params.Productvendorid,
//             Category: params.Category
//         })
//         const productadd = await newproductadd.save()
//         const createquantity = new Quantity({
//             Productid: productadd._id,
//             Productquantity: params.Productquantity,
//             Operation: "Add",
//             Reason: "New Stock Arrived"
//         })
//         const addquantity=await createquantity.save()
//         console.log("Product add service ", productadd)
//         session.commitTransaction()
//         return productadd
//     }
//     catch (e: any) {
//         session.abortTransaction()
//         if (e.message == datanotfoundmessage) throw datanotfoundindb
//         throw serverdownerror
//     }
//     finally{
//         session.endSession()
//     }
// }
// export const Productgetser = async (data: productgetall) => {
//     mongoose.set("debug", true)
//     try {
//         let skip_no_of_records = 0
//         if (data.offset) skip_no_of_records = parseInt(data.offset)
//         let listingproducts = await Products.aggregate([
//             {
//                 $match: {
//                     Isactive: true,
//                 }
//             },
//             {
//                 $project: {
//                     Isactive: 0,
//                     Enter_Date: 0,
//                     __v: 0
//                 }
//             },
//             { $skip: skip_no_of_records },
//             { $limit: 20 }
//         ])
//         console.log("listing offset>>>", listingproducts)
//         if (data.category) {
//             const categorylists = data.category.split(",")
//             const testcatname = new RegExp(`${data.category}`, "i");
//             // /te/gmi
//             console.log(testcatname)
//             listingproducts = await Products.aggregate([
//                 {
//                     $match: {
//                         $or: [{ Category: { $regex: testcatname } }, { Category: { $in: [categorylists] } }, { Category: { $all: [categorylists] } }],
//                         Isactive: true
//                     }
//                 },
//                 {
//                     $project: {
//                         Productimages: 0,
//                         Isactive: 0,
//                         Enter_Date: 0
//                     }
//                 },
//                 { $skip: skip_no_of_records },
//                 { $limit: 20 }
//             ])
//         }
//         return listingproducts
//     }
//     catch (e) {
//         console.log("listinf error offset >>>", e)
//         throw serverdownerror
//     }
// }
// export const Productuptser = async (data: productuptuses) => {
//     console.log("Category products", data.Category)
//     try {
//         const fetchingproducts = await Products.aggregate([
//             {
//                 $match: {
//                     _id: new mongoose.Types.ObjectId(data.Productid)
//                 }
//             }
//         ])

//         const updatecategory = {
//             $addToSet: {
//                 Category: { $each: data.Category }
//             },
//             $set: {
//                 Productname: data.Productname ? data.Productname : fetchingproducts[0].Productname,
//                 Productshortdescription: data.Productshortdescription ? data.Productshortdescription : fetchingproducts[0].Productshortdescription,
//                 Productlongdescription: data.Productlongdescription ? data.Productlongdescription : fetchingproducts[0].Productlongdescription,
//                 Productprice: data.Productprice ? data.Productprice : fetchingproducts[0].Productprice,
//                 Productdiscountprice: data.Productdiscountprice ? data.Productdiscountprice : fetchingproducts[0].Productdiscountprice,
//                 Isactive: data.Isactive ? data.Isactive : fetchingproducts[0].Isactive
//             },
//         }
//         console.log(updatecategory)
//         mongoose.set('debug', true)
//         const updatingproducts = await Products.updateOne(
//             { _id: data.Productid },
//             updatecategory,
//             // updateobjeproducts,
//             {
//                 new: true,
//             }
//         )
//         return updatingproducts
//     }
//     catch (e) {
//         console.log("Here is the product update.", e)
//         throw serverdownerror
//     }
// }
// export const Productfetsingleser = async (data: productfetchsingle) => {
//     try {
//         mongoose.set("debug",true)
//         const fetchingsingleproduct = await Products.aggregate([
//             {
//                 $match: {
//                     _id: new mongoose.Types.ObjectId(data.Productid)
//                 }
//             },
//             {
//                 $lookup: {
//                     as: "Productsqunatity",
//                     from: "quantities",
//                     localField: "_id",
//                     foreignField: "Productid"
//                 }
//             },
//             { $unwind: "$Productsqunatity" },
//             {
//                 $group: {
//                     _id: {
//                         Productid: "$Productsqunatity.Productid",
//                         Productname:"$Productname",
//                         Productshortdescription:"$Productshortdescription",
//                         Productlongdescription: "$Productlongdescription",
//                         Productprice: "$Productprice",
//                         Productdiscountprice: "$Productdiscountprice",
//                         Productimages: "$Productimages",
//                         Category: "$Category",
//                         Productopertaions: "$Productsqunatity.Operation"
//                     },
//                     qunatity: { $sum: "$Productsqunatity.Productquantity" }
//                 }
//             }
//         ])
//         console.log("fetchingsingleproduct>>>>",fetchingsingleproduct)
//         if (!fetchingsingleproduct) throw datanotfoundindb
//         return fetchingsingleproduct
//     }
//     catch (e: any) {
//         if (e.message == datanotfoundmessage) throw datanotfoundindb
//         throw serverdownerror
//     }
// }
// export const Uploadfileser = async (params: any, insertid: string) => {
//     try {
//         const udpateproductimages = await Products.updateOne({
//             _id: insertid
//         }, {
//             $addToSet: {
//                 Productimages: params.path
//             }
//         }
//         )
//         return "Files Uploaded Successfully"
//     }
//     catch (e) {
//         return
//     }
// }
// export const deleteproductdbser = async (params: any) => {
//     mongoose.set("debug", true
//     )
//     try {
//         const fetchingsingleproduct = await Products.updateOne(
//             {
//                 _id: new mongoose.Types.ObjectId(params)
//             }
//             , {
//                 $set: {
//                     Isactive: false
//                 }
//             }
//         )
//         if (!fetchingsingleproduct) throw datanotfoundindb
//         return fetchingsingleproduct
//     }
//     catch (e: any) {
//         if (e.message == datanotfoundmessage) throw datanotfoundindb
//         throw serverdownerror
//     }
// }