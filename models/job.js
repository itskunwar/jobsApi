const mongoose = require("mongoose");

const JobSchema = mongoose.Schema(
  {
    company: {
      type: String,
      maxlength: 20,
      required: [true, "Company name is requried as hell!"],
    },
    position: {
      type: String,
      required: [true, "Position is required as hell!"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["processing", "interview", "final"],
      default: "processing",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Who is the fuckin owner?!!!!"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
