const _ = require("lodash")
const fare = require("./fareHandler")

const batchTranslate = (stopIDs, fares) => stopIDs.map((stopID, i) => _.extend(translate(stopID), fare.getFareByIndex(i, fares)))

const translate = stopID => _.pick(data.stopList[stopID], "name")

module.exports = { translate, batchTranslate }