const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  quantity: {type: Number,default: 1,required: true},

  unitPrice: {type: Number,required: true},

  commandeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commande",
    required: true
  },

  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
});

const OrderItem = mongoose.model("OrderItem", OrderItemSchema);

module.exports = { OrderItem };