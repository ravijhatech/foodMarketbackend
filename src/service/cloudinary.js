import dotenv from "dotenv";
import { CloudinaryStorage} from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary';
import multer from "multer";

dotenv.config();


// Cloudinary configration

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});


export const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"uploads",
        
    },
});
export {cloudinary,upload };

 const upload = multer({ dest: 'uploads/' });
