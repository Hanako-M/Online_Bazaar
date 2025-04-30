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
        },
        wallet:{
            type:Number,
            default:0
        },
        paymentMethods: [
          {  type: {
                type: String, // e.g., "visa", "paypal"
                required: true,
              },
              Id: {
                type: String,
                required: true,
              },
              password: {
                type: String,
                required: true,
              }
            }
]})
customerschema.pre('save', async function (next) {
    try {
      // Hash main account password if modified
      if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
      }
  
      // Hash each payment method's password if modified
      if (this.isModified("paymentMethods")) {
        for (let method of this.paymentMethods) {
          if (method.isModified("password")) {
            method.password = await bcrypt.hash(method.password, 10);
          }
        }
      }
  
      next();
    } catch (err) {
      next(err);
    }
  });
  
const customer=mongoose.model('customer',customerschema)
module.exports=customer