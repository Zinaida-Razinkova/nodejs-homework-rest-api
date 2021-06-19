const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.MONGO_URL;
console.log(uriDb);

const db = async () => {
  return await mongoose.connect(uriDb,
    {
      useUnifiedTopology: true,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
}

mongoose.connection.on("connected", (error) => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose error: ${error.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Database connection closed");
    process.exit(1);
  });
});

module.exports = db;
