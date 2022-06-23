const _ = require("lodash")

const coHandler = require("./coHandler")
const stopHandler = require("./stopHandler")
const freqHandler = require("./freqHandler")

const buildRt = rt => (
  {
    co: coHandler.joinCompany(rt.co),
    route: rt.route,
    orig: rt.orig,
    dest: rt.dest
  }
)

const buildRtDetails = (rt, selectedCo) => (
  {
    co: coHandler.joinCompany(rt.co),
    route: rt.route,
    bound: rt.bound[selectedCo] === "I" ? "inbound" : rt.bound[selectedCo] === "O" ? "Outbound" : rt.bound[selectedCo],
    orig: rt.orig,
    dest: rt.dest,
    stops: stopHandler.batchTranslate(rt.stops[selectedCo], rt.fares),
    freq: freqHandler.getFrequency(rt.freq)
  }
)

const printRt = rt => console.log(_.find(Object.values(data.routeList), { route: rt }))

module.exports = { buildRt, buildRtDetails, printRt }