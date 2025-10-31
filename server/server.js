const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/dbConfig");
const experienceRoutes = require("./routes/experience");
const bookingRoutes = require("./routes/booking");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const url = process.env.MONGODB_URL;

//Database Connection
connectDB(url)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use("/experiences", experienceRoutes);
app.use("/bookings", bookingRoutes);


//Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        status: 'error',
        message: 'An unexpected error occurred.',
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
