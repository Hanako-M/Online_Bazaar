const mongoose=require("mongoose")
const Schema=mongoose.Schema

const orderschema=new Schema({
   
    totalprice:{
        type:Number,
        required:true,
        default:0
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required:true
    },createdAt: 
    { type: Date,
     default: Date.now },
     status:{
         type:String,
         default:'pending'
     }
})
const orders=mongoose.model('orders',orderschema)
module.exports=orders