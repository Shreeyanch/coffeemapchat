const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS Middleware — allow frontend at localhost:3001
// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || origin === "http://localhost:3000") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Routes
const cafeRoutes = require("./routes/cafe");
app.use("/api/cafes", cafeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
