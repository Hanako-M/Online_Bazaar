const mongoose=require("mongoose")
// const todos=require("../models/todo.models.js")
// const users=require("../models/users.models.js")
const connectDB=async()=>{
    try{
      const connection=await mongoose.connect(process.env.MONGO_URI);
      console.log("connected to the database");
    }catch(err){
        console.error(err);
    }
}

module.exports=connectDB;