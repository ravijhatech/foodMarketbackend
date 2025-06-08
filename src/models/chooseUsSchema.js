import mongoose from "mongoose";

const ChooseUsSchema=new mongoose.Schema({
    logUrl:{
        type:String,
    },
    logTitle:{
        type:String,
        
    },
    informationText:{
        type:String,
        
    }
});
const ChooseUs = mongoose.model('ChooseUs', ChooseUsSchema);
export default ChooseUs;