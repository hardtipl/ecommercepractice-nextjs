import { Loginpara, Userscollection, Databaseconnctionerror, serverdownerror, datanotfoundindb, datanotfoundmessage } from "../utils/applicationsvarialbes"
import Users from '../dbmodels/users'
import md5 from "md5"
import "../Dbconfig"
import mongoose from "mongoose"
export const Loginser = async (params: loginuses) => {
    try {
        console.log("Params login service",params)
        mongoose.set('debug',true)
        const protectedpass: string = md5(params.password)
        const findingindbs = await Users.aggregate([{
            $match: {
                Username: params.name,
                Password: protectedpass
            }
        },
        {
            $project: {
                Password: 0
            }
        }
        ])
        if (findingindbs.length == 0 || !findingindbs) {
            throw datanotfoundindb
        }
        return findingindbs
    }
    catch (e: any) {
        console.log("login service",e)
        if (e.message == datanotfoundmessage) throw datanotfoundindb
        throw serverdownerror
    }
}
// export Login
export interface loginuses {
    name: string;
    password: string
}