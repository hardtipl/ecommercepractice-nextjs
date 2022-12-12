import { NextFunction, Request, Response } from "express"
import { Createorderser, Orderhistoryser } from "../services"
import { datanotfoundmessage, serverdownmessage } from "../utils/applicationsvarialbes"
import { Errorhandler } from "../utils/errorhandler"
export const Orderaddcont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let productsargs = req.body
        productsargs.Vendorinfo = req.query.Authtokendata
        const orderproducts = await Createorderser(productsargs)
        return res.json({
            products: orderproducts
        })
    }
    catch (e: any) {
        let Ordercreateerror = new Errorhandler(`${e}`, 400)
        if (e.message == serverdownmessage) {
            Ordercreateerror = new Errorhandler(`${serverdownmessage}`, 500)
        }
        else if (e.message == datanotfoundmessage) {
            Ordercreateerror = new Errorhandler(`${datanotfoundmessage}`, 404)
        }
        next(Ordercreateerror)
    }
}
export const Orderhistorycont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const fetchforvendor = req.query.Authtokendata
        const fetchinghistory = await Orderhistoryser(fetchforvendor)
        return res.json({
            Orderhistory:fetchinghistory
        })
    }
    catch (e) {
        let Orderhistoryerror = new Errorhandler(`${e}`, 400)
        next(Orderhistoryerror)
    }
}