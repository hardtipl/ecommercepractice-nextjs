import { NextFunction, Response, Request } from "express";
import { Chekoutser } from "../services";
import { Errorhandler } from "../utils/errorhandler";
export const Checkoutcont = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let productsargs = req.body
        productsargs.Vendorinfo = req.query.Authtokendata
        console.log("from checkout controller", productsargs)
        const checkout = await Chekoutser(productsargs)
        return res.json({
            checkoutsuccess: true
        })
    }
    catch (e: any) {
        console.log("from order cotnroller", e)
        let Ordercreateerror = new Errorhandler(`${e}`, 400)

        next(Ordercreateerror)
    }
}