import mongoose from "mongoose";

const Productschema = new mongoose.Schema({
    Productname: { type: String },
    Productshortdescription: { type: String },
    Productlongdescription: { type: String },
    Productprice: { type: Number },
    Productdiscountprice: { type: Number },
    Productimages: [],
    Isactive: { type: Boolean, default: true },
    Category: [],
    Productdetails: { type: String },
    Additionalinformation: { type: String },
    Extraoptions: [{
        Color:{type: String},
        Size:{type: String},
        Quantity:{type:Number}
    }],
    Size: [{ type: String }],
    Colors: [{ type: String }],
    Enter_Date: { type: Date, default: Date.now() }
})
export default mongoose.model('product', Productschema)
