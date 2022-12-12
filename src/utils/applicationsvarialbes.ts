export enum Loginpara {
    username = "Username",
    Password = "Password",
}
export enum Userscollection {
    username = "Username",
    password = "Password",
    user = "Usertype",
    usermail = "Useremailid",
    contact = "Usercontact",
    address = "Useraddress"
}
export type Databaseconnctionerror = {
    message: "Sorry Internal Server Error"
    status: 500
}
export const ordernotregistered=new Error("Sorry Order Has Some issue")
export const serverdownerror=new Error("Sorry Database Connection Error")
export const datanotfoundindb=new Error('Sorry no data found')
export const serverdownmessage=`Sorry Database Connection Error`
export const datanotfoundmessage=`Sorry no data found`
export const ordernotregisteredmessage=`Sorry Order Has Some issue`
export const productorderfails=`Sorry Product is not Available`
export const fileuplaoderror=new Error(`File Uploadation is fails`)
