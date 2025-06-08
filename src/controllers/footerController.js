import Footer from '../models/footerSchema.js';

export const FooterPost = async (req, res) => {
 
    try {
        const { title,detailText,address,email,contactnumber } = req.body;
        
        const FooterInformation = new Footer({
            title: title,
            detailText:detailText,
            address:address,
            email:email,
            contactnumber:contactnumber,
        });
        console.log(FooterInformation);

        await FooterInformation.save();
        res.status(201).json({ message: 'Footer Details uploaded sucessfully!'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const FooterDetailsFetch = async (req, res) => {
    try {
     const response = await Footer.find();
     res.json({message:"Footer Details Fetch Sucessfully!",response});
    } catch (error) {
     res.json({message:"error"})
     
    }
 
 }
 export const FooterDetailsDelete = async (req, res) => {
     try {
       const FooterDetails = await Footer.findByIdAndDelete(req.params.id);
 
       console.log(FooterDetails);
       
       
       if (!FooterDetails) return res.status(404).json({ message: 'Footer Details Not Found' });
       await FooterDetails.deleteOne();
   
       res.status(200).json({ message: 'Footer deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
 
 
   export const FooterDetailsUpdate = async (req, res) => {
     try {
       let blog = await Footer.findById(req.params.id);
       
       if (!blog) return res.status(404).json({ message: 'Blog not found' });
   
       const data = {
        title: req.body.title || blog.title,
        detailText: req.body.detailText || blog.detailText,
        address: req.body.address || blog.address,
        email: req.body.email || blog.email,
        contactnumber: req.body.contactnumber || blog.contactnumber,
         
       };
   
       // Update Footer document
       blog = await Footer.findByIdAndUpdate(req.params.id, data, { new: true });
       res.status(200).json({message:"Footer Update Sucessfully!"});
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };