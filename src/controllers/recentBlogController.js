import fs from 'fs';
import { cloudinary } from "../service/cloudinary.js";
import RecentBlog from '../models/recentBlogSchema.js';

export const RecentBlogController = async (req, res) => {
 
    try {
        const { recentblogtext } = req.body;
        const recentBlogImageUrl = req.file.path;
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        fs.unlinkSync(req.file.path);

        const InformationDetails = new RecentBlog({
            recentblogtext: recentblogtext,
            recentBlogImageUrl: result.secure_url,
            public_id: result.public_id,
        });
        console.log(InformationDetails);

        await InformationDetails.save();
        res.status(201).json({ message: 'Information Details uploaded sucessfully!' ,recentBlogImageUrl});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const RecentBlogDetailsFetch = async (req, res) => {
    try {
     const response = await RecentBlog.find();
     res.json({message:"Blogs Details Fetch Sucessfully!",response});
    } catch (error) {
     res.json({message:"error"})
     
    }
 
 }
 export const RecentBlogDetailsDelete = async (req, res) => {
     try {
       const RecentDetailBlog = await RecentBlog.findByIdAndDelete(req.params.id);
 
       console.log(RecentDetailBlog);
       
       
       if (!RecentDetailBlog) return res.status(404).json({ message: 'Recent Blog Details Not Found' });
   
       // Delete image from Cloudinary
       if (RecentDetailBlog.public_id) {
         await cloudinary.uploader.destroy(RecentDetailBlog.public_id);
       }
   
       // Delete blog from MongoDB
       await RecentDetailBlog.deleteOne();
   
       res.status(200).json({ message: 'Recent Blog deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
 
 
   export const RecentBlogDetailsUpdate = async (req, res) => {
     try {
       let blog = await RecentBlog.findById(req.params.id);
       console.log(blog);
       
       if (!blog) return res.status(404).json({ message: 'Recent Blog not found' });
   
       const data = {
        recentblogtext: req.body.recentblogtext || blog.recentblogtext,
         
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
         data.recentBlogImageUrl = result.secure_url;
         data.public_id = result.public_id;
       }
    //    console.log(result);
       
       // Update document
       blog = await RecentBlog.findByIdAndUpdate(req.params.id, data, { new: true });
       res.status(200).json({message:"Recent Blog Update Sucessfully!"});
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };