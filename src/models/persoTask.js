
const mongoose = require("mongoose");
const PersoTaskSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  status:{type:String,enum:["to_do","in_progress","finished"],default: "to_do"},
  priority: {type: String,enum: ["low", "medium", "high"],
  default: "medium"
    },
  deadline: {
  type: Date
},
  createdAt: {type: Date,default: Date.now},
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
  
})
const PersoTask = mongoose.model("PersoTask", PersoTaskSchema);

module.exports = { PersoTask };