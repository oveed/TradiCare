const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    userId: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: false,
      default: Date.now,
    },
    lastInteractedWith: {
      type: Date,
      required: false,
      default: Date.now,
    },
    // convId: {
    //     type: Number,
    //     required: false,
    // }
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;
