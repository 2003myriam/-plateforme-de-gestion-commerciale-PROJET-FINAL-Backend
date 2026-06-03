const mongoose= require("mongoose")
require("dotenv").config()

const connectDB=async()=>{
    try{

        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongo db connected")
    }
    catch(error){
        console.log("not working, ",error.message)
    }
}
module.exports=connectDB