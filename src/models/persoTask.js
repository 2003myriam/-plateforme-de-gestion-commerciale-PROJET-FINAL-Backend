
const mongoose = require("mongoose");
const PersoTaskSchema = new mongoose.Schema({
  title: {type: String,required: true},
  description: {type: String,required: true,},
  status:{type:"string",enum:["to_do","in_progress","finished"],default: "to_do"},
  createdAt: {type: Date,default: Date.now},
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  
})
const PersoTask = mongoose.model("PersoTask", PersoTaskSchema);

module.exports = { PersoTask };