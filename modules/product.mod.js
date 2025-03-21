const mongoose=require("mongoose")
const Schema=mongoose.Schema

const prodschema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    vendor:{
        type:Schema.Types.ObjectId,
        ref:'vendor',
        required:true
    },
    company:{
        type:Schema.Types.ObjectId,
        ref:'company',
        //required:true
    }, 
    photo:{
        type:String
    }
})
const product=mongoose.model('todos',prodschema)
module.exports=product