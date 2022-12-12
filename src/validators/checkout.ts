import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { Errorhandler } from "../utils/errorhandler";
export const Checkoutvalid = async (req: Request, res: Response, next: NextFunction) => {
    const addrschema = Joi.object({
        Country: Joi.string().required(),
        State: Joi.string().required(),
        City: Joi.string().required(),
        Address: Joi.string().required()
    })
    const checkoutschema = Joi.object({
        Billingaddress: addrschema,
        Shippingaddress: addrschema,
    });
    try {
        const here = await checkoutschema.validate(req.body);
        if (here.error) throw here.error
        next()
    }
    catch (e: any) {
        console.log("validation errors", e)
        let Checkoutvalidations = new Errorhandler(e.message, 400)
        next(Checkoutvalidations)
    }
}