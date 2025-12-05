import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./dbconfig.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// basic root
app.get("/", (req, res) => {
  res.send("Backend server is up. Hit /health for JSON.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (PORT=${PORT})`);
});
