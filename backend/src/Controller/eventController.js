const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
  const e = await Event.create({ ...req.body, createdBy: req.user.id });
  res.status(201).json(e);
};

exports.listEvents = async (req, res) => {
  const events = await Event.find().sort({ startAt: 1 });
  res.json(events);
};

exports.getEvent = async (req, res) => {
  const e = await Event.findById(req.params.id);
  if (!e) return res.status(404).json({ message: "Event not found" });
  res.json(e);
};
