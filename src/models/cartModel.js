import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
     productId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
    },
    quantity:{
        type:Number,
        default:1
    },
},{timestamps:true});

export default mongoose.model('Cart' , cartSchema);