import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import gadgetRoutes from "./routes/gadget.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Base route for API health check
app.get("/", (req, res) => {
  res.send("IMF Gadget API is running...");
});

// Routes
app.use("/gadgets", gadgetRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

