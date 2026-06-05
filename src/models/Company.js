
const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  companyName: {type: String,required: true},
  companyEmail: {type: String,required: true,unique: true},
  created_at:{type:Date ,default:Date.now()},
  joinCode:{type:String},
  expiresAt: { type:Date}, // signifie Temps actuel + 5 jours
  ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  
})
const Company = mongoose.model("Company", CompanySchema);

module.exports = { Company };