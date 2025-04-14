const customers=require("../modules/customer.mod.js")
const orders=require("../modules/orders.mod.js")
const product=require("../modules/product.mod.js")
const reviews=require("../modules/review.mod.js")

const addtoCart=async(req,res)=>{
    const { productid, quantity } = req.body;
    const { userid } = req.user;
    
    try {
      const customer = await customers.findById(userid);
      const productData = await product.findById(productid);
    
      if (!productData) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
    
      // Normalize old cart structure (optional, for safety)
      customer.cart = customer.cart.map(item => {
        if (typeof item === 'object' && item.product) return item;
        return { product: item, quantity: 1 }; // Convert old format to new one
      });
    
      // Find existing product in cart
      const existingItem = customer.cart.find(item => 
        item.product && item.product.toString() === productid
      );
    
      if (existingItem) {
        existingItem.quantity += quantity || 1;
      } else {
        customer.cart.push({
          product: productid,
          quantity: quantity || 1
        });
      }
    
      await customer.save();
    
      res.status(200).json({ success: true, message: "Product added to cart successfully" });
    
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong in adding to cart" });
    }
    
}

const viewCart=async(req,res)=>{
    const {userid}=req.user;
    try{
        const customer=await customers.findById(userid).populate("cart");

        res.status(200).json({success:true,cart:customer.cart});
    }catch(err){
        res.status(500).json({error:"something went wrong in viewing the cart"});
    }
}

const removefromCart = async (req, res) => {
    const { userid } = req.user;  // Get the user id from the session or request
    const { productid } = req.body;  // Get the product id from the request body

    try {
        const customer = await customers.findById(userid);  // Find the customer by user id
        if (!customer) {
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        // Find and remove the product from the cart using ObjectId comparison
        const productIndex = customer.cart.findIndex(item => item.product.toString() === productid);
        if (productIndex === -1) {
            return res.status(404).json({ success: false, message: "Product not found in cart" });
        }

        // Remove the product from the cart
        customer.cart.splice(productIndex, 1);

        // Save the updated cart
        await customer.save();

        return res.status(200).json({ success: true, message: "Product removed from cart successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Something went wrong in removing from cart" });
    }
};


const viewOrders=async(req,res)=>{
    const {userid}=req.user;
    try{
        const customer=await customers.findById(userid).populate("orders");
        res.status(200).json({success:true,
            orders: customer.orders});
    }catch(err){
        res.status(500).json({error:"something went wrong in viewing the orders"});
    }
}

const makeOrder = async (req, res) => {
    const { userid } = req.user;
  
    try {
      const customer = await customers.findById(userid).populate("cart.product");
  
      if (!customer.cart.length) {
        return res.status(400).json({ success: false, message: "Cart is empty" });
      }
  
      // Check stock and calculate total price
      let totalPrice = 0;
      for (let item of customer.cart) {
        if (item.product.inStock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Not enough stock for product: ${item.product.name}`
          });
        }
        totalPrice += item.quantity * item.product.price;
      }
  
      // Create order
      const orderItems = customer.cart.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));
  
      const newOrder = new orders({
        products: orderItems,
        totalprice: totalPrice,
        userId: userid
      });
  
      await newOrder.save();
  
      // Update customer
      customer.orders.push(newOrder._id);
      customer.cart = [];
      await customer.save();
  
      res.status(200).json({ success: true, message: "Order made successfully" });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong in making the order" });
    }
  };
  
const cancelOrder=async(req,res)=>{     
    const {orderid}=req.body;
    const {userid}=req.user;
    try{
        const customer=await customers.findById(userid);
        const order=await orders.findById(orderid);
        if(!order){
            return res.status(404).json({success:false,message:"order not found"}); 
        }
            const orderTime = new Date(order.createdAt);
            const currentTime = new Date();
            const timeDifference = (currentTime - orderTime) / (1000 * 60 * 60); // Convert ms to hours
    
            if (timeDifference > 24) {
                return res.status(400).json({ success: false, message: "Cancellation period expired (24-hour limit)" });
            }
    
        customer.orders=customer.orders.filter((order)=>order.toString()!==orderid);
        await customer.save();
        await orders.findByIdAndDelete(orderid);
        res.status(200).json({success:true,message:"order is canceled successfully"});
    }catch(err){
        res.status(500).json({error:"something went wrong in canceling the order"});
    }
}

const addReview = async (req, res) => {
    const { userid } = req.user;
    const { productId, review, rating } = req.body;
  
    try {
      // Load customer with orders and nested products
      const customer = await customers.findById(userid).populate({
        path: 'orders',
        populate: {
          path: 'products.product',
          model: 'product'
        }
      });
  
      if (!customer) return res.status(404).json({ message: "Customer not found" });
  
      // Check if user has ordered this product
      const hasOrdered = customer.orders.some(order =>
        order.products.some(p => p.product && p.product._id.toString() === productId)
      );
  
      if (!hasOrdered) {
        return res.status(403).json({ message: "You can only review products you have ordered." });
      }
  
      // Optional: Prevent duplicate reviews
      const existingReview = await reviews.findOne({ product: productId, customer: userid });
      if (existingReview) {
        return res.status(400).json({ message: "You've already reviewed this product." });
      }
  
      const newReview = new reviews({
        review,
        rating,
        product: productId,
        customer: userid
      });
  
      await newReview.save();
  
      res.status(201).json({ message: "Review added successfully", review: newReview });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Something went wrong while adding review." });
    }
  };
  const deleteReview = async (req, res) => {
    const { reviewId } = req.body;
    const { userid } = req.user; // assuming JWT middleware sets this

    try {
        const review = await reviews.findById(reviewId);

        if (!review) {
            return res.status(404).json({ message: "Review not found." });
        }

        if (review.customer.toString() !== userid) {
            return res.status(403).json({ message: "You can only delete your own reviews." });
        }

        await reviews.findByIdAndDelete(reviewId);

        res.status(200).json({ message: "Review deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong while deleting the review." });
    }
};

const editInfo=async(req,res)=>{
    const {userid}=req.user;
    const {name,email,phone,address}=req.body;
    try{
        const customer=await customers.findById(userid);
        if(!customer){
            return res.status(404).json({success:false,message:"vendor not found"});
        }
        if(name) customer.name=name;
        if(email) customer.email=email;
        if(phone) customer.phone=phone;
        if(address) customer.address=address;
        await customer.save(); 
       
        res.status(200).json({success:true,message:"info updated successfully"});
    }catch(err){
        console.log(err)    
        res.status(500).json({error:"something went wrong in updating the info"});
    }
}
const viewInfo=async(req,res)=>{
    const {userid}=req.user;
    try{
        const customer=await customers.findById(userid);
        res.status(200).json({success:true,
            name:customer.name,
            email:customer.email,
            phone:customer.phone,
            address:customer.address,
            orders:customer.orders,
        });
    }catch(err){
        res.status(500).json({error:"something went wrong in viewing the info"});
    }
}
module.exports={
    addtoCart,
    viewCart,
    removefromCart,
    viewOrders,
    makeOrder,
    cancelOrder,
    addReview,
    deleteReview,
    editInfo,
    viewInfo
}