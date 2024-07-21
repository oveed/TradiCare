const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String, unique: true, sparse: true },
  provider: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
