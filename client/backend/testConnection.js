const mongoose = require("mongoose");

// const MONGO_URI = process.env.MONGO_URI;
const MONGO_URI =
  // "mongodb+srv://chakrabortyshibam184:Q2RkKzON6VCX2Vrn@cluster0.72mp2.mongodb.net/college?retryWrites=true&w=majority&appName=Cluster0";
  `mongodb+srv://chakrabortyshibam184:Q2RkKzON6VCX2Vrn@cluster0.72mp2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected Successfully"))
//   .catch((err) => console.error("Error connecting to MongoDB:", err));

// const connectDb = async () => {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("connection successfull to db");
//   } catch (error) {
//     console.log("database connection failed");
//     process.exit(0);
//   }
// };

// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log(`server is running at port: ${PORT}`);
//   });
// });

const PORT = 8080;

const Connection = async () => {
  const URL = `mongodb://127.0.0.1:27017/auth-db`;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("database connection done");
  } catch (error) {
    console.log("error while connecting", error);
  }
};

Connection().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});
