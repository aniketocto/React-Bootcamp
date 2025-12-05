import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, phoneNumber, adminKey } = req.body;

    // Check existing user
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Role assignment
    let role = "user";
    if (adminKey && adminKey === process.env.ADMIN_SECRET) {
      role = "admin";
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      phoneNumber,
      role,
    });

    // Generate token
    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Password check intentionally commented in your code
  // const ok = await user.comparePassword(password);
  // if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
