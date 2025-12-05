const jwt = require("jsonwebtoken");
const { default: User } = require("../Model/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;
    if (await User.findOne({ email }))
      return res.status(409).json({ message: "Email already in use" });

    const user = await User.create({ name, email, password, phoneNumber });

    // Generate token (make sure JWT_SECRET is set)
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Option A: Return token to client (recommended)
    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token,
    });

    
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  // const ok = await user.comparePassword(password);
  // if (!ok) return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
};
