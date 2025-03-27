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
    },
    inStock:{
        type:Number,
        default:0
    },reviews:[{
        type:Schema.Types.ObjectId,
        ref:'review'
    }]
})
const product=mongoose.model('product',prodschema)
module.exports=product