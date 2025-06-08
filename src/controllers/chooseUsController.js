import fs from 'fs';
import { cloudinary } from "../service/cloudinary.js";
import OurFeatureWork from '../models/ourFeaturedWorkSchema.js';
import ChooseUs from '../models/chooseUsSchema.js';

export const ChooseUsSchema = async (req, res) => {
 
    try {
        const { logTitle,informationText } = req.body;
        const logUrl = req.file.path;
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        fs.unlinkSync(req.file.path);

        const ChooseUsDetails = new ChooseUs({
            logTitle: logTitle,
            informationText:informationText,
            logUrl: result.secure_url,
            public_id: result.public_id,
        });
        console.log(ChooseUsDetails);

        await ChooseUsDetails.save();
        res.status(201).json({ message: 'Choose Us uploaded sucessfully!' ,logUrl});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const  ChooseUsFetch = async (req, res) => {
    try {
     const response = await ChooseUs.find();
     res.json({message:"Choose Us Fetch Sucessfully!",response});
    } catch (error) {
     res.json({message:"error"})
     
    }
 
 }
 export const ChooseUsDelete = async (req, res) => {
     try {
       const OurFeatureWorkRes = await ChooseUs.findByIdAndDelete(req.params.id);
 
       console.log(OurFeatureWorkRes);
       
       
       if (!OurFeatureWorkRes) return res.status(404).json({ message: 'Choose Us Not Found' });
   
       // Delete image from Cloudinary
       if (OurFeatureWorkRes.public_id) {
         await cloudinary.uploader.destroy(OurFeatureWorkRes.public_id);
       }
   
       // Delete blog from MongoDB
       await OurFeatureWorkRes.deleteOne();
   
       res.status(200).json({ message: 'Choose Us deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
 
 
   export const ChooseUsUpdate = async (req, res) => {
     try {
       let blog = await ChooseUs.findById(req.params.id);
       console.log(blog);
       
       if (!blog) return res.status(404).json({ message: 'Choose Us not found' });
   
       const data = {
        logTitle: req.body.logTitle || blog.logTitle,
        informationText: req.body.informationText || blog.informationText,
         
       };
       console.log(data);
       // new image is uploaded
       if (req.file) {
         // Delete old image from Cloudinary
         if (blog.public_id) {
           await cloudinary.uploader.destroy(blog.public_id);
         }
   
         // Upload new image
         const result = await cloudinary.uploader.upload(req.file.path);
         data.logUrl = result.secure_url;
         data.public_id = result.public_id;
       }
    //    console.log(result);
       
       // Update document
       blog = await ChooseUs.findByIdAndUpdate(req.params.id, data, { new: true });
       res.status(200).json({message:"Choose Us Update Sucessfully!"});
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };