
const vendor=require('../modules/vendor.mod.js');
const customer=require('../modules/customer.mod.js');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');



//craeting tokens
const createtoken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:60*60*24*1000}/*1 day*/);
}

const customerSignUp = async (req, res) => {
    const { username,email, password,address } = req.body;
    console.log(username, email, password,address);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newcust = new customer({
            username,
            email,
            password: hashedPassword,
            address
        });
        await newcust.save();

        return res.status(201).json({
            success: true,
            message: "Customer registered successfully"
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Something went wrong" });
    }
};

const vendorSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(name, email, password);

    try {
        const newvend = new vendor({
            name,
            email,
            password
        });
        await newvend.save();

        // ✅ Return here to prevent further execution
        return res.send({
            "success": true,
            "message": "Vendor registered successfully"
        });
    } catch (err) {
        // ✅ Return here to prevent execution from continuing to res.send()
        return res.status(404).json({ "error": "Something went wrong" });
    }
};

const signIn=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const custfound=  await customer.findOne({email});
        const vendfound=  await vendor.findOne({email});
        const found= custfound || vendfound;//if custfound is null then vendfound will be assigned to found
        console.log(found);
        if(found){
         const auth = await bcrypt.compare(password, found.password);
         console.log(found.password);
         if(auth){
            const token=createtoken(found._id);
            res.cookie("token",token,{httpOnly:true,maxAge:60*60*24*1000});
            console.log("the token is",token);
            res.status(200).send({
              "success": true,
              "user":{
                "id":found._id,
                "username":found.username||found.name,
                "email":found.email
             }
          })
         }else{
            res.status(406).send({
                "success": false,
                "message": "incorrect auth email/password"
            })
         }
        }else{
            res.status(406).send({
                "success": false,
                "message": "User not found or incorrect email/password"
            })
        }
        
      }
      catch(err){
    
        res.send({
            "success": false,
            "message": "User not found or incorrect email/password"
        })
      }
}

const signOut = async (req, res) => {
    console.log("Before Clearing:", req.cookies.token); // Log the token before clearing

    // Expire the cookie
    res.cookie("token", "", { httpOnly: true, expires: new Date(0) });

    res.status(200).send({
        success: true,
        message: "User signed out successfully"
    });
};

module.exports={
customerSignUp,
vendorSignUp,
signIn,
signOut
}