import { NextFunction ,Response,Request} from "express";
import { Loginser, loginuses } from "../services/loginservice";
import { datanotfoundmessage, serverdownerror,serverdownmessage } from "../utils/applicationsvarialbes";
import { Errorhandler } from "../utils/errorhandler";
import { generatetoken } from "../utils/generate.token";
export const Logincont=async (req:Request,res:Response,next:NextFunction)=>{
try{
    const logincredentials:loginuses=req.body
    console.log(logincredentials)
    const logindetails=await Loginser(logincredentials)
    const cretingtoken=generatetoken(logindetails[0])
    return res.json({
        Logintoken:cretingtoken
    }).status(200)
}
catch(e:any){
    if(e.message==serverdownmessage){
        const Login=new Errorhandler(`${serverdownmessage}`,500)
        next(Login)
    }
    else if(e.message==datanotfoundmessage){
        const Login=new Errorhandler(`${datanotfoundmessage}`,404)
        next(Login)
    }
    else{
        const Login=new Errorhandler(`${e.message}`,400)
        next(Login)
    }
}
}