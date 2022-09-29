const cron = require("node-cron")
const axios = require("axios").default
const { printInfo, printError } = require("../util/logger")

const cron_reloadMongo = () => cron.schedule("0 4 * * *", async () => {
  printInfo("Cronjob started")
  const res = await axios.post("http://localhost:4000/mongo/load-data")
  if (res.status == 201) printInfo("Cronjob data load ok.")
  else printError("Cronjob data load failed.")
}, {timezone: "Asia/Hong_Kong"})

const startCronjob = () => {
  printInfo("Cronjob is scheduled....")
  cron_reloadMongo()
}

module.exports = {startCronjob}