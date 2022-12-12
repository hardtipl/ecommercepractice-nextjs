import { NextFunction,Response,Request } from "express";
import Joi from "joi";
import { Errorhandler } from "../utils/errorhandler";

export const  Registervalid= async(req:Request, res:Response, next:NextFunction) => {
    const productaddschema = Joi.object({
        name:Joi.string().required(),
        password: Joi.string().required(),
        email:Joi.string().email().required()
    });
    try{
        console.log("added hte product images",req.body)
        const here = await productaddschema.validate(req.body);
        if(here.error) throw here.error
        next()
    }
    catch(e:any){
        console.log("validation errors",e)
        let Registervalidations = new Errorhandler(e.message, 400)
        next(Registervalidations)
    }
}