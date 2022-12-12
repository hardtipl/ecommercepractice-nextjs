import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import config from '../config';
import { Errorhandler } from "./errorhandler";
function checkauthentication(req: Request, res: Response, next: NextFunction) {
    let token: string | undefined = req.header("authorization");
    let secrettpasskey: string = process.env.secreatkey || config.secreatkey
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        jwt.verify(token, secrettpasskey, (err, decoded: any) => {
            if (err) {
                console.log("from the error", err.name)
                // if(err.message=="jwt expired"){
                return next(new Errorhandler(err.name, 400))
            } else {
                req.query['Authtokendata'] = decoded.availabeldata
                next();
            }
        });
    } else {
        const Unahthorize = new Errorhandler("Access Denied! Unauthorized User", 401)
        next(Unahthorize)
    }
}
export default checkauthentication