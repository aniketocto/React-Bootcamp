const mongoose = require("mongoose");

const SupportTicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  issueType: {
    type: String,
    enum: ["payment", "login", "event", "other"],
    default: "other",
  },
  comment: { type: String },
  status: {
    type: String,
    enum: ["booked", "cancelled", "checked-in"],
    default: "booked",
  },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  qrVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SupportTicket", SupportTicketSchema);
