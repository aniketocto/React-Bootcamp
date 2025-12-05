import Event from "../Model/Event.js";

// CREATE EVENT
export const createEvent = async (req, res) => {
  try {
    const payload = { ...req.body };

    const e = await Event.create(payload);

    // If you want createdBy later, uncomment:
    // await e.populate({ path: "createdBy", select: "name email" });

    return res.status(201).json({ success: true, event: e });
  } catch (err) {
    console.error("createEvent error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// LIST EVENTS
export const listEvents = async (req, res) => {
  const events = await Event.find().sort({ startAt: 1 });
  return res.json(events);
};

// GET EVENT BY ID
export const getEvent = async (req, res) => {
  const e = await Event.findById(req.params.id);
  if (!e) return res.status(404).json({ message: "Event not found" });
  return res.json(e);
};
