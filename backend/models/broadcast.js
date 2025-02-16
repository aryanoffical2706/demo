const mongoose = require("mongoose");

const broadcastSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  activity: { type: String, required: true },
  joinRequests: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    },
  ],
});

module.exports = mongoose.model("Broadcast", broadcastSchema);