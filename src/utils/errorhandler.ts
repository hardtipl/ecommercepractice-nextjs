import { NextFunction, Request,Response } from "express";
export class Errorhandler{
  
    message:string
    status:number
    constructor(message:string,status:number){
        this.message=message;
        this.status=status
        // console.log("here is an Errorhandler is called")
    }
}
export const Errormiddlewear=(error:Errorhandler,req:Request,res:Response,next:NextFunction)=>{
    const status=error.status||500
    const message=error.message||"There is Something Wrong"
    res.status(status).send(
        message
      )
  //     res.status(status);
  // res.json(
  //   message
  // );
}