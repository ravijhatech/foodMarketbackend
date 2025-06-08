import ClientsSay from '../models/clientSaySchema.js';

export const ClientSay = async (req, res) => {
 
    try {
        const { clientTitle,detailsText } = req.body;
        
        const FooterInformation = new ClientsSay({
            clientTitle: clientTitle,
            detailsText:detailsText,
        });
        console.log(FooterInformation);

        await FooterInformation.save();
        res.status(201).json({ message: 'Client Say uploaded sucessfully!'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const ClientsSayDetailsFetch = async (req, res) => {
    try {
     const response = await ClientsSay.find();
     res.json({message:"Clients Say Details Fetch Sucessfully!",response});
    } catch (error) {
     res.json({message:"error"})
     
    }
 
 }
 export const ClientsSayDetailsDelete = async (req, res) => {
     try {
       const ClientsSayDetails = await ClientsSay.findByIdAndDelete(req.params.id);
 
       console.log(ClientsSayDetails);
       
       
       if (!ClientsSayDetails) return res.status(404).json({ message: 'Client say Details Not Found' });
       await ClientsSayDetails.deleteOne();
   
       res.status(200).json({ message: 'Client say deleted successfully' });
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };
 
 
   export const ClientsSayDetailsUpdate = async (req, res) => {
     try {
       let blog = await ClientsSay.findById(req.params.id);
       
       if (!blog) return res.status(404).json({ message: 'Clients Say not found' });
   
       const data = {
        clientTitle: req.body.clientTitle || blog.clientTitle,
        detailsText: req.body.detailsText || blog.detailsText,  
       };
   
       // Update Footer document
       blog = await ClientsSay.findByIdAndUpdate(req.params.id, data, { new: true });
       res.status(200).json({message:"Clients Say Update Sucessfully!"});
     } catch (err) {
       res.status(500).json({ message: err.message });
     }
   };