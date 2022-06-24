const _ = require("lodash")

// const { companyService: coSvc, stopService: stopSvc, freqService: freqSvc } = require("./service-group")
const { companyService: coSvc } = require("./co-service") 
const { stopService: stopSvc } = require("./stop-service")
const { freqService: freqSvc } = require("./freq-service")

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
      co: coSvc.stringifyCompany(rt.route, rt.co),
      route: rt.route,
      bound: rt.bound[selectedCo] === "I" ? "inbound" : rt.bound[selectedCo] === "O" ? "Outbound" : rt.bound[selectedCo],
      orig: rt.orig,
      dest: rt.dest,
      stops: stopSvc.batchTranslateStop(rt.stops[selectedCo], rt.fares),
      freq: freqSvc.getFrequency(rt.freq)
    }
  )
}

// Console log raw data for route details 
const consoleLogRt = rt => console.log(_.find(Object.values(data.routeList), { route: rt }))


module.exports = { buildRt, buildRtDetails, consoleLogRt }