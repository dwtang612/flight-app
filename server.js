require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const Price = require("./models/Price");

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error", err));

// Route to fetch prices
app.get("/api/fetch-prices", async (req, res) => {
  if (process.env.USE_MOCK === "true") {
    const mock = require("./mock_data/flights.json");
    await Price.insertMany(mock);
    return res.json({ success: true, count: mock.length, data: mock });
  }

  return res.status(400).json({ error: "USE_MOCK=false but no real API yet" });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
