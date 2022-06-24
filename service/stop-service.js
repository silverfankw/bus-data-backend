const _ = require("lodash")

const { getFareByIndex } = require("./fare-service")


// Get bus stop order by index + 1 (since index starts from 0)
const getStopOrder = idx => ({stop_no: idx + 1})


// Construct bus stop name, bus stop fare, and bus stop no.
const batchTranslateStop = (stopIDs, fares) => 
  stopIDs.map((stopID, i) => _.extend(translateStop(stopID), [getFareByIndex(i, fares), getStopOrder(i)]))


// Lookup bus stop name by stopID in the stopList
const translateStop = stopID => _.pick(data.stopList[stopID], "name")


module.exports = { translateStop, batchTranslateStop }