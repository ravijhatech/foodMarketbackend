import mongoose from "mongoose";

const OurFeatureWorkSchema=new mongoose.Schema({
    featureImageUrl:{
        type:String,
        
    },
    featuretext:{
        type:String,
        
    }
});
const OurFeatureWork = mongoose.model('OurFeatureWork', OurFeatureWorkSchema);
export default OurFeatureWork;