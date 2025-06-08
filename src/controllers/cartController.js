import Cart from '../models/cartModel.js'

export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Check if the product already exists in the cart
    const existingItem = await Cart.findOne({ userId, productId });

    if (existingItem) {
      // Update quantity if item already in cart
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({ message: "Cart updated", cart: existingItem });
    }

    const newItem = await Cart.create({
      userId,
      productId,
      name,
      price,
      image,
      quantity,
    });

    res.status(201).json({ message: "Item added to cart", cart: newItem });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// remove fro cart

export const removeFromcart = async (req ,res)=>{
    const {id} =req.params;
    try {
        await Cart.findByIdAndDelete(id);
        res.status(200).json({message:"item deleted sucessfully"})
    } catch (error) {
        res.status(500).json({message:"item not deleted"})

        
    }
}

export const getCartItem = async (req ,res)=>{
    try {
        const cartItem = await Cart.find();
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
}