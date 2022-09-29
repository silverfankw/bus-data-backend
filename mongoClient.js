const mongoose = require("mongoose");
const { printInfo, printError } = require("./util/logger")

const { MONGO_URI } = process.env;

const connectMongo = () => {
  mongoose.connect(MONGO_URI, {}).then(() => {
    printInfo("Successfully connected to database.");
  }).catch(err => {
    printError(`Database connection failed: ${err}`);
    process.exit(1);
  })
}

module.exports = {connectMongo}