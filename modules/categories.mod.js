const mongoose=require("mongoose")
const Schema=mongoose.Schema

const categschema=new Schema({
    name:{
        type:String,
        required:true
    },
    products:[{
        type:Schema.Types.ObjectId,
        ref:'product',
        
    }]
})
const categories=mongoose.model('categories',categschema)
module.exports=categories