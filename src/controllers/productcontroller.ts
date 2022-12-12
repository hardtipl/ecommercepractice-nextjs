import { NextFunction, Response, Request } from "express"
import { deleteproductdbser, Productaddser, productadduses, productfetchsingle, Productfetsingleser, productgetall, Productgetser, Productuptser, Uploadfileser } from "../services/"
import { datanotfoundmessage, serverdownmessage } from "../utils/applicationsvarialbes"
import { Errorhandler } from "../utils/errorhandler"

export const Productlistallcont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productsargs: productgetall = req.query
        const listingallproducts = await Productgetser(productsargs)
        return res.json({
            products: listingallproducts
        })
    }
    catch (e: any) {
        let Productlistingerror = e.message
        if (e.message == serverdownmessage) {
            Productlistingerror = new Errorhandler(`${serverdownmessage}`, 500)
        }
        else if (e.message == datanotfoundmessage) {
            Productlistingerror = new Errorhandler(`${datanotfoundmessage}`, 404)
        }
        next(Productlistingerror)
    }
}

export const Productsinglecont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requiredpath: any = req.params
        const productsingle = await Productfetsingleser(requiredpath)
        return res.json({
            product: productsingle
        })
    }
    catch (e: any) {
        let Productsingleerror = e.message
        if (e.message == serverdownmessage) {
            const Productsingleerror = new Errorhandler(`${serverdownmessage}`, 500)
        }
        else if (e.message == datanotfoundmessage) {
            const Productsingleerror = new Errorhandler(`${datanotfoundmessage}`, 404)
        }
        next(Productsingleerror)
    }
}

export const Productaddcont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productinfo = req.body
        productinfo.Productvendorid = req.query.Authtokendata
        const insertproductdb: any = await Productaddser(productinfo)
        console.log("here is the product adding", insertproductdb, req.files)
        if (req.files) {
            const productfileimages: any = req.files
            console.log("here is as", productfileimages)
            const createingpromisechain = productfileimages.map((e: any) => {
                return Uploadfileser(e, insertproductdb._id)
            })
            await Promise.all(createingpromisechain);
            res.json({
                message: `Congratulations! Product Added and Product Images Uploaded`
            })
        }
        else {
            res.json({
                message: `Congratulations! Product Added Uploaded`
            })
        }
    }
    catch (e: any) {
        console.log("Error in the product add >>>>>", e)
        let Productadderror = e.message
        if (e.message == serverdownmessage) {
            Productadderror = new Errorhandler(`${serverdownmessage}`, 500)
        }
        else if (e.message == datanotfoundmessage) {
            Productadderror = new Errorhandler(`${datanotfoundmessage}`, 404)
        }
        next(Productadderror)
    }
}

export const productuptcont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const producinfo = req.body
        producinfo.Productid = req.params.Productid
        const udpateproduct = await Productuptser(producinfo)
        if (req.file) {
            const productfileimages: any = req.file
            const createingpromisechain = productfileimages.map((e: any) => {
                return Uploadfileser(e, "sdfads")
            })
            await Promise.all(createingpromisechain);
            res.json({
                message: `Congratulations! Product Updated and Product Images Uploaded`
            })
        }
        else{
            res.json({
                message: `Congratulations! Product Updated `
            })
        }
    }
    catch (e: any) {
        let Productupterror = e.message
        if (e.message == serverdownmessage) {
            Productupterror = new Errorhandler(`${serverdownmessage}`, 500)
        }
        else if (e.message == datanotfoundmessage) {
            Productupterror = new Errorhandler(`${datanotfoundmessage}`, 404)
        }
        next(Productupterror)
    }
}
export const disableproduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const temdeleteprod = req.params.Productid
        const deletepro = await deleteproductdbser(temdeleteprod)
        return res.json({
            message: "Product is deleted"
        })
    }
    catch (e) {
        console.log(e)
    }
}