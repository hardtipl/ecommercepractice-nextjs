import { NextFunction, Request, Response } from "express";
import { Errorhandler } from "./errorhandler";
export default function Pagenotfound(req:Request,res:Response,next:NextFunction){
  let nopagfoung=  new Errorhandler("Requested Page Not Available",404)
  next(nopagfoung)
}