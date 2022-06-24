const _ = require("lodash")

const { stringifyCompany } = require("./co-service") 
const { batchTranslateStop } = require("./stop-service")
const { getFrequency } = require("./freq-service")

// Build route object only for basic information
const buildRt = rt => (
  {
    co: coSvc.joinCompany(rt.co),
    route: rt.route,
    orig: rt.orig,
    dest: rt.dest
  }
)

// Build route object for detail information
const buildRtDetails = (rt, selectedCo) => {
  if (selectedCo == "lwb") selectedCo = "kmb"
  return (
    {
      co: stringifyCompany(rt.route, rt.co),
      route: rt.route,
      bound: rt.bound[selectedCo] === "I" ? "inbound" : rt.bound[selectedCo] === "O" ? "Outbound" : rt.bound[selectedCo],
      orig: rt.orig,
      dest: rt.dest,
      stops: batchTranslateStop(rt.stops[selectedCo], rt.fares),
      freq: getFrequency(rt.freq)
    }
  )
}

// Console log raw data for route details 
const consoleLogRt = rt => console.log(_.find(Object.values(data.routeList), { route: rt }))


module.exports = { buildRt, buildRtDetails, consoleLogRt }