import Ticket from "../Model/Ticket.js";
import Event from "../Model/Event.js";

export const bookEvent = async (req, res) => {
    
  try {
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check capacity
    if (event.totalRegistrations >= event.capacity) {
      return res.status(400).json({ message: "Event is full" });
    }

    // Try to create a new ticket
    let ticket;
    try {
      ticket = await Ticket.create({ event: eventId, user: userId });
    } catch (err) {
      if (err.code === 11000) {
        return res.status(400).json({ message: "Already booked" });
      }
      throw err;
    }

    // Increment event count
    event.totalRegistrations += 1;
    await event.save();

    return res.status(201).json({
      message: "Event booked successfully",
      ticket,
    });
  } catch (err) {
    console.error("bookEvent error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
