const vendors=require("../modules/vendor.mod.js")
const orders=require("../modules/orders.mod.js")
const products=require("../modules/product.mod.js")
const categories=require("../modules/categories.mod.js")
const product = require("../modules/product.mod.js")
const postProducts=async(req,res)=>{
    const {title,description,price,category,photo,quantity}=req.body;
    const {userid}=req.user;
    try{
            const vendor =await vendors.findById(userid);
            const categoryData = await categories.findOne(category);
            if (!categoryData) {
               categories.create({name:category});
            }
            const newproduct = new products({
                title,
                description,
                price,
                category,
                vendor:userid,
                photo,
                quantity
            });
            newproduct.inStock+=quantity;
            vendor.products.push(newproduct.__id);
           await newproduct.save();
           await vendor.save();
            res.status(200).json({success:true,message:"product added successfully"});
        }catch(err){
            res.status(500).json({error:"something went wrong in adding a product"});
        }
    
}
const viewProducts=async(req,res)=>{
    const {userid}=req.user;
    try{
        const vendor=await vendors.findById(userid).populate("products");
        res.status(200).json({success:true,products:vendor.products});
    }catch(err){
        res.status(500).json({error:"something went wrong in viewing the products"});
    }
}
const removeProduct=(req,res)=>{
    const {productid}=req.body;
    const {userid}=req.user;
    vendors.findById(userid).then((vendor)=>{
        if(!vendor){
            return res.status(404).json({success:false,message:"vendor not found"});
        }
        vendor.products=vendor.products.filter((product)=>product.toString()!==productid);
        products.findByIdAndDelete(productid);
        vendor.save();
        res.status(200).json({success:true,message:"product is removed successfully"});
    }).catch((err)=>{
        res.status(500).json({error:"something went wrong in removing the product"});
    })
}