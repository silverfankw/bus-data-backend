const mongoose = require("mongoose");
require("dotenv").config();

// console.log(process.env)

const { MONGO_URI } = process.env;
const PORT = 4000
const RAW_DATA_SOURCE = "https://hkbus.github.io/hk-bus-crawling/routeFareList.min.json"

const connectMongo = () => {
  mongoose.connect(MONGO_URI, {}).then(() => {
    console.log("Successfully connected to database.");
  }).catch(err => {
    console.log(`Database connection failed: ${err}`);
    process.exit(1);
  })
}

module.exports = {PORT, RAW_DATA_SOURCE, connectMongo}