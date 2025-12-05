import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["booked", "cancelled", "checked-in"],
    default: "booked",
  },
  qrVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate booking
TicketSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("Ticket", TicketSchema);
