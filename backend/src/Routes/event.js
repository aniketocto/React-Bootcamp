import express from "express";
import { auth, role } from "../Middlewares/auth.js";
import { validate } from "../Middlewares/validate.js";

const router = express.Router();
import {
  createEvent,
  getEvent,
  listEvents,
} from "../Controller/eventController.js";

// POST /events  -- admin only
router.post(
  "/create",
  // auth, // sets req.user = { id, role }
  //   role("admin"), // blocks non-admins
  //   validate(createEvent),
  createEvent
);

// public reads
router.get("/", listEvents);
router.get("/:id", getEvent);

export default router;
