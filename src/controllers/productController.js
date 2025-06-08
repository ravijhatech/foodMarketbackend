
import fs from 'fs';
import { cloudinary } from '../service/cloudinary.js';
import Food from '../models/productSchema.js';


export const uploadFood = async (req, res) => {
 
    try {
        const { productname,price } = req.body;
        const image = req.file.path;
        // const url = req.file ? `/uploads/${req.file.filename}` : '';
        const result = await cloudinary.uploader.upload(req.file.path);
        console.log(result);

        fs.unlinkSync(req.file.path);

        const Image = new Food({
           productname:productname,
            price:price,
            image: result.secure_url,
            public_id: result.public_id,
        });
        console.log(Image);

        await Image.save();
        res.status(201).json({ message: 'Image uploaded sucessfully!', image });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const FetchFood = async (req, res) => {
   try {
    const response = await Food.find();
    res.json(response);
   } catch (error) {
    res.json({message:"error"})
    
   }

}

export const getfoodById = async(req,res ) =>{
  const item = await Food.findById(req.params.id);
  res.json(item);
}
export const deleteFood = async (req, res) => {
    try {
      const blog = await Food.findByIdAndDelete(req.params.id);

      console.log(blog);
      
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      // Delete image from Cloudinary
      if (blog.public_id) {
        await cloudinary.uploader.destroy(blog.public_id);
      }
  
      // Delete blog from MongoDB
      await blog.deleteOne();
  
      res.status(200).json({ message: 'Blog and image deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  export const updateFood = async (req, res) => {
    try {
      let blog = await Food.findById(req.params.id);
      console.log(blog);
      
      if (!blog) return res.status(404).json({ message: 'Blog not found' });
  
      const data = {
        title: req.body.blogtitle || blog.blogtitle,
        
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
        data.imageUrl = result.secure_url;
        data.public_id = result.public_id;
      }
      console.log(result);
      
  
      // Update document
      blog = await Food.findByIdAndUpdate(req.params.id, data, { new: true });
      console.log(blog);
      
  
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };