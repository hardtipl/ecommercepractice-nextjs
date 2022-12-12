import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    Username: { type: String,required:true },
    Password: { type: String ,required:true},
    Useremailid:{type:String,required:true},
    Usercontact: {
        type: String,
    },
    Billingaddress:[{
        Country:{type:String},
        State:{type:String},
        City:{type:String},
        Address:{type:String}
    }],
    Shippingaddress:[{
        Country:{type:String},
        State:{type:String},
        City:{type:String},
        Address:{type:String}
    }],
    Enter_Date: { type: Date, default: Date.now() }
})
export default mongoose.model('users', Userschema)
