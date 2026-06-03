
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

CategorySchema.index({ name: 1, companyId: 1 }, { unique: true });  //l’index aide à chercher vite, et unique interdit les doublons

module.exports = mongoose.model("Category", CategorySchema);