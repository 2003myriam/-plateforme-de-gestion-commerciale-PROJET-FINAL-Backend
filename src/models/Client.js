const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  wilaya: { type: String },
  badge:{type:String, enum:[ "vip",
      "new",
      "regular",
      ],default:'regular'},
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

ClientSchema.index({ email: 1, companyId: 1 }, { unique: true }); //un email peut exister dans plusieurs companies dans la meme plateforme

const Client = mongoose.model("Client", ClientSchema);
module.exports = { Client };

 
