import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // For attendees who register for events
    registrations: [
      {
        eventId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Event",
        },
        qrCode: String, // stored image URL or string
        checkedIn: {
          type: Boolean,
          default: false,
        },
        checkedInAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
