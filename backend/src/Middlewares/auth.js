import jwt from "jsonwebtoken";
import User from "../Model/User.js";

export const auth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log(">>> auth middleware - raw Authorization header:", header);

    const token = header?.split(" ")[1];
    console.log(
      ">>> extracted token (length):",
      token ? token.length : token,
      "   raw token debug:",
      token ? JSON.stringify(token) : token
    );

    if (!token) {
      console.log(">>> No token found - returning 401");
      return res.status(401).json({ message: "Unauthorized - no token" });
    }

    // Decode for debugging
    let decoded;
    try {
      decoded = jwt.decode(token, { complete: true });
      console.log(">>> jwt.decode (unverified):", decoded);
    } catch (dErr) {
      console.log(">>> jwt.decode error:", dErr?.message);
    }

    // Verify token
    try {
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        console.log(">>> WARNING: process.env.JWT_SECRET is undefined!");
      } else {
        console.log(
          ">>> process.env.JWT_SECRET present (length):",
          secret.length
        );
      }

      const payload = jwt.verify(token, secret);
      console.log(">>> jwt.verify succeeded payload:", payload);

      const user = await User.findById(payload.id).select("-password");
      if (!user) {
        console.log(">>> No user found for id:", payload.id);
        return res
          .status(401)
          .json({ message: "Unauthorized jwt - user not found" });
      }

      req.user = { id: user._id.toString(), role: user.role };
      return next();
    } catch (verifyErr) {
      console.log(
        ">>> jwt.verify error name:",
        verifyErr.name,
        "message:",
        verifyErr.message
      );
      return res
        .status(401)
        .json({ message: "Invalid token", error: verifyErr.message });
    }
  } catch (err) {
    console.error(">>> auth middleware unexpected error:", err);
    return res.status(500).json({ message: "Server error in auth" });
  }
};

export const role =
  (...roles) =>
  (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: "Unauthorized role" });

    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
