const connectDB = require("./config/dbConfig");
const experienceModel = require("./models/Experience");
require("dotenv").config();

const url = process.env.MONGODB_URL || "mongodb://localhost:27017/bookit";

const seedData = [
  {
    title: "Beachside Escape",
    description: "Relax by the sea and enjoy stunning sunsets.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    price: 120,
    slots: [
      { date: "Nov 2", available: 3 },
      { date: "Nov 3", available: 2 },
    ],
  },
  {
    title: "Mountain Trek Adventure",
    description: "Explore breathtaking mountain trails and fresh air.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    price: 200,
    slots: [
      { date: "Nov 4", available: 4 },
      { date: "Nov 5", available: 1 },
    ],
  },
  {
    title: "City Lights Tour",
    description: "Discover the best night views and local food scenes.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312",
    price: 150,
    slots: [
      { date: "Nov 6", available: 5 },
      { date: "Nov 7", available: 0 },
    ],
  },
];

connectDB(url)
  .then(() => experienceModel.insertMany(seedData))
  .then(() => console.log("Data seeded successfully!"))
  .catch((err) => console.error("Error seeding data:", err));