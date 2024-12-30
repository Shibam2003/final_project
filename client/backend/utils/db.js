const mongoose = require("mongoose");
// const URI = "mongodb://127.0.0.1:27017";
// mongoose.connect(URI);

// const URI = process.env.MONGODB_URI;
const URI = "mongodb://127.0.0.1:27017/auth-db";

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connection successfull to db");
  } catch (error) {
    console.log("database connection failed", error);
    process.exit(0);
  }
};

module.exports = connectDb;
