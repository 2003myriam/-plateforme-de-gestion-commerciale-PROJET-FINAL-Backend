
const mongoose = require("mongoose");
const CompanySchema = new mongoose.Schema({
  companyName: {type: String,required: true},
  companyEmail: {type: String,required: true,unique: true},
  created_at:{type:Date ,default:Date.now()},
})
const Company = mongoose.model("Company", CompanySchema);

module.exports = { Company };