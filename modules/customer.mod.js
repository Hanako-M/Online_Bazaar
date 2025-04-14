const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');
const Schema=mongoose.Schema

const customerschema=new Schema({
    username:{
        type:String,
        required:true
    },address:{
        type:String,
        required:true
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
    },orders:[{
        type:Schema.Types.ObjectId,
        ref:'orders',
        //required:true
    }],cart: [{
        product: {
          type: Schema.Types.ObjectId,
          ref: 'product'
        },
        quantity: {
          type: Number,
          default: 1
        }
      }]
      ,reviews:[{
        type:Schema.Types.ObjectId,
        ref:'review'}],
        phone:{
            type:String,
            minLength:11
        }
})
customerschema.pre('save',function(next){
    //const salt=bcrypt.genSalt();//salt to put in the begining of the password
    if (!this.isModified("password")) {
       return next();
    }
    this.password=bcrypt.hash(this.password,10);//hash the password + the salt
    next();
})
const customer=mongoose.model('customer',customerschema)
module.exports=customer