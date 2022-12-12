import mongoose from "mongoose";

const Productorderschema = new mongoose.Schema({
    Productslist:[{
        Qty:{type:Number,required:true},
        Productid:{type:'ObjectId'},
        Subtotal:{type:Number,required:true}
    }],
    OrderCreateddate:{type:Date ,default: Date.now()},
    Customerid:{type:'ObjectId',required:true}
})
export default mongoose.model('orders', Productorderschema)
