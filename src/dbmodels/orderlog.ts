import mongoose from "mongoose";

const Productorderlogschema = new mongoose.Schema({
    Productslist:[{
        Qty:{type:Number,required:true},
        Productdetails:{
            Productname:{type:String},
            Productprice:{type:Number},
            Discountprice:{type:Number}
        },
        Subtotal:{type:Number,required:true}
    }],
    Orderid:{type:'ObjectId',required:true},
    OrderCreateddate:{type:Date ,default: Date.now()}
})
export default mongoose.model('orderlogs', Productorderlogschema)
