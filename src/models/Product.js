const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image:{type:String},
  sku: { type: String }, // réference du produit
  price: { type: Number, required: true },
  stockQuantity: { type: Number, default: 0 },
  stockMin: { type: Number, default: 0 },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = { Product };