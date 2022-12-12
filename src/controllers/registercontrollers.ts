import { NextFunction ,Request,    Response} from "express"
import { Registeruserser } from "../services"
import { datanotfoundmessage, serverdownmessage } from "../utils/applicationsvarialbes"
import { Errorhandler } from "../utils/errorhandler"

export const Registercont=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const logincredentials=req.body
        console.log(logincredentials)
        const logindetails=await Registeruserser(logincredentials)
        return res.json({
            message:"Congratulation! User is Registered"
        }).status(200)
    }
    catch(e:any){
        if(e.message==serverdownmessage){
            const Register=new Errorhandler(`${serverdownmessage}`,500)
            next(Register)
        }
        else if(e.message==datanotfoundmessage){
            const Register=new Errorhandler(`${datanotfoundmessage}`,404)
            next(Register)
        }
        else{
            const Register=new Errorhandler(`${e.message}`,400)
            next(Register)
        }
    }
    }