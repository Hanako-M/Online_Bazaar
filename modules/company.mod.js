const mongoose=require("mongoose")
const Schema=mongoose.Schema

const orderschema=new Schema({
   
    name:{
        type:String,
        required:true
    },
    product:[{
        type:Schema.Types.ObjectId,
        ref:'product',
        
    }]
})
const company=mongoose.model('company',companyschema)
module.exports=company