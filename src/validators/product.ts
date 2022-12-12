import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Errorhandler } from "../utils/errorhandler";
export const  Productaddvalid= async(req:Request, res:Response, next:NextFunction) => {
    const productaddschema = Joi.object({
        Productname:Joi.string().required(),
        Productshortdescription:Joi.string().required(),
        Productlongdescription:Joi.string().required(),
        Productdiscountprice:Joi.number().required(),
        Productprice:Joi.number().required(),
        Productquantity:Joi.number().required(),
        Category:Joi.alternatives().try(Joi.array().items(Joi.string()),Joi.string()).required()
    });
    try{
        console.log("added hte product images",req.body)
        const here = await productaddschema.validate(req.body);
        if(here.error) throw here.error
        next()
    }
    catch(e:any){
        console.log("validation errors",e)
        let Productaddvalidations = new Errorhandler(e.message, 400)
        next(Productaddvalidations)
    }
}
export const  Productuptvalid= async(req:Request, res:Response, next:NextFunction) => {
    console.log("came in the product update validation")
    const productupdateschema = Joi.object({
        Productname:Joi.string(),
        Productshortdescription:Joi.string(),
        Productlongdescription:Joi.string(),
        Productdiscountprice:Joi.number(),
        Productprice:Joi.number(),
        Category:Joi.array().items(Joi.string())
    });
    try{
        const here = await productupdateschema.validate(req.body);
        if(here.error) throw here.error
        next()
    }
    catch(e:any){
        console.log("validation errors",e)
        let Productupdatevalidations = new Errorhandler(e.message, 400)
        next(Productupdatevalidations)
    }
}