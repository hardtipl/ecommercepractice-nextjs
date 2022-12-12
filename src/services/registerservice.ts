import md5 from 'md5'
import Users from '../dbmodels/users'
import "../Dbconfig"
import { serverdownerror } from '../utils/applicationsvarialbes'
export const Registeruserser = async (params: Registerinterface) => {
    try {
        const protectedpass: string = md5(params.password)
        const insertuser = new Users({
            // Useraddress: params.Useraddress,
            Useremailid: params.email,
            Password: protectedpass,
            // Usercontact: params.Usercontact,
            Username: params.name
        })
        const dbinsuser=insertuser.save()
        return dbinsuser
    }
    catch (e) {
        console.log("Register User got an error",e)
        throw serverdownerror
    }
}

export interface Registerinterface {
    name: string;
    Usercontact?: string
    password: string
    email: string
    Useraddress: any
}