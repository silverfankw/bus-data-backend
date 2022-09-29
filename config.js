const mongoose = require("mongoose");
require("dotenv").config();

const { printInfo, printError } = require("./util/logger")

const { MONGO_URI } = process.env;
const PORT = 4000
const RAW_DATA_SOURCE = "https://hkbus.github.io/hk-bus-crawling/routeFareList.min.json"

const connectMongo = () => {
  mongoose.connect(MONGO_URI, {}).then(() => {
    printInfo("Successfully connected to database.");
  }).catch(err => {
    printError(`Database connection failed: ${err}`);
    process.exit(1);
  })
}

module.exports = {PORT, RAW_DATA_SOURCE, connectMongo}