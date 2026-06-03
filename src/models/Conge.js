const mongoose = require("mongoose");

const CongeSchema = new mongoose.Schema({
  start_date: {type: Date,required: true},
  end_date: {type: Date,required: true},
  motif: {type: String},
  status: { type: String,enum: ["approved", "rejected", "pending"],default: "pending"},

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Conge = mongoose.model("Conge", CongeSchema);

module.exports = { Conge };