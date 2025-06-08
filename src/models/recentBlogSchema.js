import mongoose from "mongoose";

const RecentBlogSchema=new mongoose.Schema({
    recentBlogImageUrl:{
        type:String,
        
    },
    recentblogtext:{
        type:String,
        
    }
});
const RecentBlog = mongoose.model('recentBlog', RecentBlogSchema);
export default RecentBlog;