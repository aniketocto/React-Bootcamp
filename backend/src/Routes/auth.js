const router = require("express").Router();
const { validate } = require("../Middlewares/validate");
const { registerSchema, loginSchema } = require("../Schemas/authschema");
const { register, login } = require("../Controller/authController");
const { auth } = require("../Middlewares/auth");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
