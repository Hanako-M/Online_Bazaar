    const mongoose=require("mongoose")
    const bcrypt = require('bcryptjs');
    const Schema=mongoose.Schema

    const vendorschema=new Schema({
        name:{
            type:String,
            required:true
        },
        phone:{
            type:String,
            minLength:11
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },company:{
            type:Schema.Types.ObjectId,
            ref:'company',
            //required:true
        }, products:[{
            type:Schema.Types.ObjectId,
            ref:'product',
        }]
    })
    vendorschema.pre('save', async function (next) {
        if (!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    });
    
    const vendor=mongoose.model('vendor',vendorschema)
    module.exports=vendor