import mongoose from "mongoose";

const AirConditioningAndHeatingSchema=new mongoose.Schema({
    airConditionImageUrl:{
        type:String,
    },
    airConditiontext:{
        type:String,
        
    }
});
const AirConditioningAndHeating = mongoose.model('AirConditioningAndHeating', AirConditioningAndHeatingSchema);
export default AirConditioningAndHeating;