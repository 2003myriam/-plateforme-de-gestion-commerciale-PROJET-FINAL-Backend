const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  status: { type: String, enum: ["pending", "in_progress", "delivered"], default: "pending"},
  paiement:{type:String,  enum: ["card", "cash"], default: "cash"},
  canal:{type:String,  enum: ["instagram", "website", "whatsapp", "store"], default: "store"},
  date: {type: Date,default: Date.now },
  total:{type:  Number, required: true},
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },
  /* ========== un tableau de produit pour chaque commande de client ========= */
    products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },

      quantity: {
        type: Number,
        required: true,
        min: 1
      },

      unitPrice: {
        type: Number,
        required: true
      },

      subtotal: {
        type: Number,
        required: true
      }
    }
  ],

});


const Commande = mongoose.model("Commande", CommandeSchema);
module.exports = { Commande };