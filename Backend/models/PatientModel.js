const mongoose = require("mongoose");

const ParticipantSchema = mongoose.Schema(
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
    // convId: {
    //     type: Number,
    //     required: false,
    // }
  },
  { timestamps: true }
);

const Participant = mongoose.model("Patient", ParticipantSchema);

module.exports = Participant;
