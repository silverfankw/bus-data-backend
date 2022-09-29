const _ = require("lodash")
const { currentDateTime, toSentenceCase } = require("./common")
const { stringifyCompany } = require("../service/co-service") 

const printInfo = message => console.log(`${currentDateTime()} [INFO] ${message}`)

const printDebug = message => console.log(`${currentDateTime()} [DEBUG] ${message}`)

const printError = (error, message = "") => console.log(`${currentDateTime()} [ERROR] ${error} ${message ? `\n ${message}` : ""}`)

const printRouteDetails = (rt, lang = "zh") => {
  console.log(`${currentDateTime()} [ROUTE INFO] ${stringifyCompany(rt.route, rt.co)[lang]} Route ${rt.route}: From '${lang == "zh" ? rt.orig.zh : toSentenceCase(rt.orig.en)}' to '${lang == "zh" ? rt.dest.zh : toSentenceCase(rt.dest.en)}'`)
}

module.exports = {printInfo, printDebug, printError, printRouteDetails}