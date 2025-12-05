const { z } = require("zod");

exports.registerSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    phoneNumber: z.string().min(10),
  }),
});

exports.loginSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) }),
});
