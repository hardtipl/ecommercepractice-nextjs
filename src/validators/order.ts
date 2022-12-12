import {Request,
    Response, NextFunction } from "express";
import Joi from "joi";
import { Errorhandler } from "../utils/errorhandler";

export const  Ordervalid= async(req:Request, res:Response, next:NextFunction) => {
    console.log("came in order validation")
    const ordercreateschema = Joi.object({
        Productlist:Joi.array().items({
            Qty: Joi.number(),
            Productid: Joi.string()
        })
        
    });
    try{
        const here = await ordercreateschema.validate(req.body);
        if(here.error) throw here.error
        next()
    }
    catch(e:any){
        console.log("validation errors",e)
        let Ordervalidations = new Errorhandler(e.message, 400)
        next(Ordervalidations)
    }
}