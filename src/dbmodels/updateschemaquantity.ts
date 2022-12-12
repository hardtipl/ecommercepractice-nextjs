import mongoose from "mongoose";

const Quantityschema = new mongoose.Schema({
    Productid: { type: "ObjectId", required: true },
    Selectedoption: {
        Color: { type: String },
        Size: { type: String }
    },
    Productquantity: { type: Number, required: true },
    Operation: { type: String, enum: ['Sub', 'Add'], default: 'Add', required: true },
    Reason: { type: String }
})
export default mongoose.model('quantity', Quantityschema)
