import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { loginuses } from "../services/loginservice";
import { Errorhandler } from "../utils/errorhandler";

export const  Logvalid= async(req:Request, res:Response, next:NextFunction) => {
    console.log("came in the registration validation")
    const loginschema = Joi.object({
        name:Joi.string().required(),
        password:Joi.string().required(),
    });
    try{
        const here = await loginschema.validate(req.body);
        if(here.error) throw here.error
        next()
    }
    catch(e:any){
        console.log("validation errors",e)
        let Loginvalidations = new Errorhandler(e.message, 400)
        next(Loginvalidations)
    }
}