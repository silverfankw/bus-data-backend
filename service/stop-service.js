const _ = require("lodash")

const { getFareByIndex } = require("./fare-service")
const { toSentenceCase } = require("../util")


// Get bus stop order by index + 1 (since index starts from 0)
const getStopOrder = idx => ({stop_no: idx + 1})


// Construct bus stop name, bus stop fare, and bus stop no.
const batchTranslateStop = (stopIDs, fares) => 
  stopIDs.map((stopID, i) => stopToSentenceCase(_.extend(translateStop(stopID), getFareByIndex(i, fares), getStopOrder(i))))


// Lookup bus stop name by stopID in the stopList
const translateStop = stopID => _.pick(data.stopList[stopID], "name")


const stopToSentenceCase = stop => ({...stop, name: {...stop.name, en: toSentenceCase(stop.name.en)}})

module.exports = { translateStop, batchTranslateStop, stopToSentenceCase }