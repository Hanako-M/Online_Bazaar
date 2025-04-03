const mongoose=require("mongoose")
const Schema=mongoose.Schema

const revschema=new Schema({
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:'customer',
        required:true
    }
});
module.exports=mongoose.model('review',revschema)