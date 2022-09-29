const cron = require("node-cron")
const { fetch } = require("../util/common")
const { CRON_DAILY_TWICE } = require("../util/cron_scheduler_def")
const { printInfo, printError } = require("../util/logger")
const { sendMail } = require("./mail-service")

const cron_reloadMongo = () => cron.schedule(CRON_DAILY_TWICE, async () => {
  printInfo("Cronjob started.")
  const res = await fetch("http://localhost:4000/mongo/load-data", {method: "POST"})

  if (res.status == 201) {
    printInfo("Cronjob data load ok.")
    sendMail("silverfankw@gmail.com", "[Nodemailer] Cronjob success", "Cronjob Success. No need further action.")
  }
  else {
    printError("Cronjob data load failed.")
    sendMail("silverfankw@gmail.com", "[Nodemailer] Cronjob fail", "Cronjob Fail. Please check with program log.")
  }
}, {timezone: "Asia/Hong_Kong"})

const startCronjob = () => {
  cron_reloadMongo()
  printInfo("Cronjob scheduled.")
}

module.exports = {startCronjob}