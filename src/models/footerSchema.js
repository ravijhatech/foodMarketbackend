import mongoose from "mongoose";

const FooterSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    detailText:{
        type:String,
        
    },
    address:{
        type:String,
    },
    email:{
        type:String,
        
    },
    contactnumber:{
        type:Number,
    },
   
});
const Footer = mongoose.model('Footer', FooterSchema);
export default Footer;