const mongoose =require("mongoose")

const ProductSchema=new mongoose.Schema({
  title:{type: String , required:true},
  réf:{type:String},
  stock_quantity:{type:Number},
  stock_min:{type:Number},
  price:{type:Number},
  
  categoryId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category"
  }
})
const Product=mongoose.model("Product",ProductSchema)
module.exports = {Product}