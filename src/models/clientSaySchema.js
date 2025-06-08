import mongoose from "mongoose";

const ClientsSaySchema=new mongoose.Schema({
    clientTitle:{
        type:String,
    },
    detailsText:{
        type:String,
        
    }
});
const ClientsSay = mongoose.model('ClientsSay', ClientsSaySchema);
export default ClientsSay;