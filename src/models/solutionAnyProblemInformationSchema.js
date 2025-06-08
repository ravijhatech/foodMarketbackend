import mongoose from "mongoose";

const SoloutionAnyProblenInformationSchema=new mongoose.Schema({
    logoImageUrl:{
        type:String,
        
    },
    textDetail:{
        type:String,
        
    }
});
const InformationSolution = mongoose.model('InformationSolution', SoloutionAnyProblenInformationSchema);
export default InformationSolution;