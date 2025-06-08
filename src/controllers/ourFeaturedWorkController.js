import fs from 'fs';
import { cloudinary } from "../service/cloudinary.js";
import OurFeatureWork from '../models/ourFeaturedWorkSchema.js';

export const OurFeatureWorkSchema = async (req, res) => {
 
    try {
        const { featuretext } = req.body;
        const featureImageUrl = req.file.path;
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        fs.unlinkSync(req.file.path);

        const OurFeatureWorkDetails = new OurFeatureWork({
            featuretext: featuretext,
            featureImageUrl: result.secure_url,
            public_id: result.public_id,
        });
        console.log(OurFeatureWorkDetails);

        await OurFeatureWorkDetails.save();
        res.status(201).json({ message: 'Our Feture Work uploaded sucessfully!' ,featureImageUrl});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const OurFeatureWorkFetch = async (req, res) => {
    try {
     const response = await OurFeatureWork.find();
     res.json({message:"Our Feture Work Fetch Sucessfully!",response});
    } catch (error) {
     res.json({message:"error"})
     
    }
 
 }
 export const OurFeatureWorkDelete = async (req, res) => {
     try {
       const OurFeatureWorkRes = await OurFeatureWork.findByIdAndDelete(req.params.id);
 
       console.log(OurFeatureWorkRes);
       
       
       if (!OurFeatureWorkRes) return res.status(404).json({ message: 'Our Feature Work Blog Not Found' });
   
       // Delete image from Cloudinary
       if (OurFeatureWorkRes.public_id) {
         await cloudinary.uploader.destroy(OurFeatureWorkRes.public_id);
       }
   
       // Delete blog from MongoDB
       await OurFeatureWorkRes.deleteOne();
   
       res.status(200).json({ message: 'Our Feature Work Blog deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
 
 
   export const FeatureWorkUpdate = async (req, res) => {
     try {
       let blog = await OurFeatureWork.findById(req.params.id);
       console.log(blog);
       
       if (!blog) return res.status(404).json({ message: 'Feature Work not found' });
   
       const data = {
        featuretext: req.body.featuretext || blog.featuretext,
         
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
         data.featureImageUrl = result.secure_url;
         data.public_id = result.public_id;
       }
    //    console.log(result);
       
       // Update document
       blog = await OurFeatureWork.findByIdAndUpdate(req.params.id, data, { new: true });
       res.status(200).json({message:"Feature Work Update Sucessfully!"});
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };