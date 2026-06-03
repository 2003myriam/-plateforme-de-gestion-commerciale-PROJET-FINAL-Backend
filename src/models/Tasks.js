const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: {type: String,enum: ["high", "medium", "low"],default: "medium"},
  status: { type: String, enum: ["to_do", "in_progress", "finished"], default: "to_do"},
  createdAt: {type: Date,default: Date.now},
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
 
});

module.exports = mongoose.model("Task", TaskSchema);