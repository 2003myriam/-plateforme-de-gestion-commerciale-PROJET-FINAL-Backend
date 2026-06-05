
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {type: String,required: true},
  email: {type: String,required: true,unique: true},
  password: {type: String,required: true},
  phone:{type:Number,required :true,unique: true},
  role:{type:String, enum:[ "founder",
      "product_manager",
      "customer_service",
      "accountant",
      "hr",
      "employee"],default:'employee'},
  created_at:{type:Date ,default:Date.now()},
  status:{type:String,enum:["pending","approved","rejected"]},
  companyId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Company",
    },

})
const User = mongoose.model("User", UserSchema);

module.exports = { User };