import fs from 'fs';
import InformationSolution from "../models/solutionAnyProblemInformationSchema.js";
import { cloudinary } from "../service/cloudinary.js";

export const InformationSolutionDetails = async (req, res) => {
 
    try {
        const { textDetail } = req.body;
        const logoImageUrl = req.file.path;
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        fs.unlinkSync(req.file.path);

        const InformationDetails = new InformationSolution({
            textDetail: textDetail,
            logoImageUrl: result.secure_url,
            public_id: result.public_id,
        });
        console.log(InformationDetails);

        await InformationDetails.save();
        res.status(201).json({ message: 'Information Details uploaded sucessfully!', logoImageUrl });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const InformationSolutionDetailsFetch = async (req, res) => {
    try {
     const response = await InformationSolution.find();
     res.json({message:"Information Details Fetch Sucessfully!",response});
    } catch (error) {
     res.json({message:"error"})
     
    }
 
 }
 export const InformationSolutionDetailsDelete = async (req, res) => {
     try {
       const InformationDetailBlog = await InformationSolution.findByIdAndDelete(req.params.id);
 
       console.log(InformationDetailBlog);
       
       
       if (!InformationDetailBlog) return res.status(404).json({ message: 'InformationSolution Details Not Found' });
   
       // Delete image from Cloudinary
       if (InformationDetailBlog.public_id) {
         await cloudinary.uploader.destroy(InformationDetailBlog.public_id);
       }
   
       // Delete blog from MongoDB
       await InformationDetailBlog.deleteOne();
   
       res.status(200).json({ message: 'Blog and image deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
 
 
   export const InformationSolutionDetailsUpdate = async (req, res) => {
     try {
       let blog = await InformationSolution.findById(req.params.id);
       console.log(blog);
       
       if (!blog) return res.status(404).json({ message: 'Blog not found' });
   
       const data = {
        textDetail: req.body.textDetail || blog.textDetail,
         
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
         data.logoImageUrl = result.secure_url;
         data.public_id = result.public_id;
       }
    //    console.log(result);
       
   
       // Update document
       blog = await InformationSolution.findByIdAndUpdate(req.params.id, data, { new: true });
       res.status(200).json({message:"Update Sucessfully!"});
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };