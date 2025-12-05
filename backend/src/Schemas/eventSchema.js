const { z } = require("zod");

exports.createEvent = z.object({
  body: z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    date: z.string().optional(),
    venue: z.string().optional(),
    startAt: z.string().optional(),
    endAt: z.string().optional(),
    capacity: z.number().int().optional(),
    totalRegistrations: z.number().int().optional(),
  }),
});
