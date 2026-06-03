const mongoose = require("mongoose");

const PlanningSchema = new mongoose.Schema({
  weekStart: {type: Date,required: true},
  weekEnd: { type: Date, required: true },
  schedule: [
    {
      day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true
      },

      startTime: {
        type: String, // "08:00"
        required: true
      },

      endTime: {
        type: String, // "16:00"
        required: true
      }
    }
  ],

  note: {
    type: String
  },

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
});

module.exports = mongoose.model("Planning", PlanningSchema);