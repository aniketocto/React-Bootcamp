// Routes/booking.js
import express from "express";
import { auth } from "../Middlewares/auth.js";
import { bookEvent } from "../Controller/BookingController.js";

const router = express.Router();

// ensure auth runs first so req.user is set
router.post("/:id/book", auth, bookEvent);

export default router;
