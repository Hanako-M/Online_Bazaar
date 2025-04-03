const vendors=require("../modules/vendor.mod.js")
const orders=require("../modules/orders.mod.js")
const products=require("../modules/product.mod.js")
const categories=require("../modules/categories.mod.js")
const product = require("../modules/product.mod.js")
const postProducts = async (req, res) => {
    const { title, description, price, category, photo, quantity } = req.body;
    const { userid } = req.user;

    try {
        const vendor = await vendors.findById(userid);
        // ✅ Correct query for category search
        let categoryData = await categories.findOne({ name: category });

        // ✅ If category does not exist, create it and assign it
        if (!categoryData) {
            categoryData = await categories.create({ name: category });
        }

        // ✅ Initialize `inStock` properly
        const newproduct = new products({
            title,
            description,
            price,
            category: categoryData._id, // ✅ Use category `_id`
            vendor: userid,
            photo,
            quantity,
            inStock: quantity // ✅ Directly set `inStock`
        });

        vendor.products.push(newproduct._id); // ✅ Fix `_id` field reference

        // ✅ Save both product and vendor
        await newproduct.save();
        await vendor.save();

        res.status(200).json({ success: true, message: "Product added successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong in adding a product" });
    }
};

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
const updateProduct = async (req, res) => {
    const { productid, title, description, price, category, photo, quantity } = req.body;
    const { userid } = req.user;

    try {
        const vendor = await vendors.findById(userid);
        if (!vendor) {
            return res.status(404).json({ success: false, message: "Vendor not found" });
        }

        const product = await products.findById(productid);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.vendor.toString() !== userid) {
            return res.status(403).json({ success: false, message: "Unauthorized to update this product" });
        }

        if (title) product.title = title;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (photo) product.photo = photo;
        if (quantity) product.quantity = quantity;

        await product.save();

        res.status(200).json({ success: true, message: "Product updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong in updating the product" });
    }
};

const addQuantity=async(req,res)=>{ 
    const {productid}=req.body;
    const {userid}=req.user;
    const{quantity}=req.body;
    try{
        const vendor=await vendors.findById(userid);
        if(!vendor){
            return res.status(404).json({success:false,message:"vendor not found"});
        }
        const product=await products.findById(productid);
        if(!product){
            return res.status(404).json({success:false,message:"product not found"});
        }
        if(product.vendor.toString()!==userid){
            return res.status(403).json({success:false,message:"Unauthorized to update this product"});
        }
        product.inStock+=quantity;
        await product.save();
        res.status(200).json({success:true,message:"quantity added successfully"});
    }catch(err){    
        res.status(500).json({error:"something went wrong in adding quantity"});
    }   
}
const viewInfo=async(req,res)=>{
    const {userid}=req.user;
    try{
        const vendor=await vendors.findById(userid);
        res.status(200).json({success:true,
            name:vendor.name,
            email:vendor.email,
            phone:vendor.phone,
            company:vendor.company,
            products:vendor.products,
        });
    }catch(err){
        res.status(500).json({error:"something went wrong in viewing the info"});
    }
}
const discount=async(req,res)=>{
    const {userid}=req.user;
    const {productid,discount}=req.body;
    try{
        const vendor=await vendors.findById(userid);
        if(!vendor){
            return res.status(404).json({success:false,message:"vendor not found"});
        }
        const product=await products.findById(productid);
        if(!product){
            return res.status(404).json({success:false,message:"product not found"});
        }
        if(product.vendor.toString()!==userid){
            return res.status(403).json({success:false,message:"Unauthorized to update this product"});
        }
        product.price-=product.price*discount/100;
        await product.save();
        res.status(200).json({success:true,message:"discount added successfully"});
    }catch(err){    
        res.status(500).json({error:"something went wrong in adding discount"});
    }   
}
module.exports={postProducts,viewProducts,removeProduct,updateProduct,addQuantity,viewInfo,discount}
