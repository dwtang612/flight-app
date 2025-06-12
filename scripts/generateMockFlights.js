const mongoose = require("mongoose");
require("dotenv").config();

const Price = require("../models/Price");

const airlines = [
  "Delta",
  "United",
  "American Airlines",
  "JetBlue",
  "Southwest",
];
const cities = ["JFK", "LAX", "SFO", "ORD", "ATL", "SEA", "MIA", "DFW"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateFlight() {
  const origin = getRandom(cities);
  let destination;
  do {
    destination = getRandom(cities);
  } while (destination === origin);

  const departDate = new Date();
  departDate.setDate(departDate.getDate() + Math.floor(Math.random() * 30));

  const returnDate = new Date(departDate);
  returnDate.setDate(returnDate.getDate() + 7);

  return {
    origin,
    destination,
    depart_date: departDate.toISOString().split("T")[0],
    return_date: returnDate.toISOString().split("T")[0],
    airline: getRandom(airlines),
    price: Math.floor(Math.random() * 300) + 100,
    currency: "USD",
    found_at: new Date(),
  };
}

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const flights = Array.from({ length: 25 }).map(generateFlight);
    await Price.insertMany(flights);
    console.log(`✅ Inserted ${flights.length} mock flights`);

    await mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error generating mock flights:", err);
    process.exit(1);
  }
}

run();
