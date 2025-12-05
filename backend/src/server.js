import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./Config/dbconfig.js";
import authRoutes from "./Routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "5mb" }));

// routes
app.use("/auth", authRoutes);
// app.use("/events", require("./routes/events"));
// app.use("/tickets", require("./routes/tickets"));
// app.use("/vip", require("./routes/vip"));
// app.use("/support", require("./routes/support"));

app.get("/", (req, res) => res.send("Event Management API"));

// global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
