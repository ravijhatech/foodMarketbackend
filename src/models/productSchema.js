import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({

  productname: String,
  price:String,
  image: String,
  public_id: String,
},
{timestamps:true});

const Food = mongoose.model("Food", FoodSchema);

export default Food;
