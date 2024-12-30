require("dotenv").config(); // Load environment variables from .env
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDb = require("./utils/db");
const router = require("./routes/auth");

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

const PORT = 5000;

// Routes
app.use("/auth", router);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
