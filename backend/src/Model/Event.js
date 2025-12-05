import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    date: {
      type: Date,
      required: true,
    },
    startAt: {
      type: String,
      required: true,
    },
    endAt: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    totalRegistrations: {
      type: Number,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
