const customers=require("../modules/customer.mod.js")
const orders=require("../modules/orders.mod.js")
const product=require("../modules/product.mod.js")

const addtoCart=async(req,res)=>{
    const {productid}=req.body;
    const {userid}=req.user;
    try{
        const customer =await customers.findById(userid);
        const productData = await product.findById(productid);
        if (!productData) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        customer.cart.push(productid);
        await customer.save();
        res.status(200).json({success:true,message:"product added to cart successfully"});
    }catch(err){
        res.status(500).json({error:"something went wrong in adding to cart"});
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
const removefromCart=(req,res)=>{
    const {productid}=req.body;
    const {userid}=req.user;
    customers.findById(userid).then((customer)=>{
        if(!customer){
            return res.status(404).json({success:false,message:"customer not found"});
        }
        customer.cart=customer.cart.filter((product)=>product.toString()!==productid);
        customer.save();
        res.status(200).json({success:true,message:"product is removed from cart successfully"});
    }).catch((err)=>{
        res.status(500).json({error:"something went wrong in removing from cart"});
    })
}

const viewOrders=async(req,res)=>{
    const {userid}=req.user;
    try{
        const customer=await customers.findById(userid).populate("orders");
        res.status(200).json({success:true,orders:customer.orders});
    }catch(err){
        res.status(500).json({error:"something went wrong in viewing the orders"});
    }
}

const makeOrder=async(req,res)=>{    
    const {userid}=req.user;
    try{
        const customer=await customers.findById(userid);
        const neworder=new orders({products:customer.cart});
        await neworder.save();
        customer.orders.push(neworder.__id);
        customer.cart=[];//empty the cart
        await customer.save();
        res.status(200).json({success:true,message:"order is made successfully"});
    }catch(err){
        res.status(500).json({error:"something went wrong in making the order"});
    }
}
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
module.exports={
    addtoCart,
    viewCart,
    removefromCart,
    viewOrders,
    makeOrder,
    cancelOrder
}