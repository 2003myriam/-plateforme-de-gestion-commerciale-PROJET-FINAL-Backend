
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {type: String,required: true},
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true},
  phone:{type:Number,required :true},
  role:{type:String, enum:[ "admin",
      "product_manager",
      "customer_service",
      "accountant",
      "hr",
      "employee"],default:'employee'},
  created_at:{type:Date ,default:Date.now()},
  companyId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Company",
      required:true,
    },

})
const User = mongoose.model("User", UserSchema);

module.exports = { User };