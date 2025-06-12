const mongoose = require("mongoose");

const PriceSchema = new mongoose.Schema({
  origin: String,
  destination: String,
  depart_date: String,
  return_date: String,
  airline: String,
  price: Number,
  currency: String,
  found_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Price", PriceSchema);
