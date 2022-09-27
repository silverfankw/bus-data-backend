const _ = require("lodash")

const { stringifyCompany } = require("./co-service") 
const { batchTranslateStop } = require("./stop-service")
const { getFrequency } = require("./freq-service")
const { toSentenceCase, isNull } = require("../util")


// Get full list of bus routes
const getRouteList = (co, rts) => {
  // Handle exception when co is undefined
  co === undefined ? co : co.toLowerCase()

  const filterRoute = arr => arr.filter(rt => stringifyCompany(rt.route, rt.co).includes(co))
  const mapRoute = prevArr => prevArr.map(rt => ({
    co: stringifyCompany(rt.route, rt.co), 
    route: rt.route, 
    orig: {...rt.orig, en: toSentenceCase(rt.orig.en)},
    dest: {...rt.dest, en: toSentenceCase(rt.dest.en)}
  }))

  if (isNull(co)) return mapRoute(rts)
  else return mapRoute(filterRoute(rts))
}


// Build route object only for basic information
const buildRt = rt => (
  {
    co: stringifyCompany(rt.route, rt.co),
    route: rt.route,
    orig: {...rt.orig, en: toSentenceCase(rt.orig.en)},
    dest: {...rt.dest, en: toSentenceCase(rt.dest.en)},
  }
)

// Build route object for detail information
const buildRtDetails = (rt, selectedCo) => {
  if (selectedCo == "lwb") selectedCo = "kmb"
  return (
    {
      co: stringifyCompany(rt.route, rt.co),
      // bg_color: ,
      // text_color: ,
      route: rt.route,
      service_type: rt.serviceType,
      bound: rt.bound[selectedCo] === "I" ? "Inbound" : rt.bound[selectedCo] === "O" ? "Outbound" : rt.bound[selectedCo],
      orig: {...rt.orig, en: toSentenceCase(rt.orig.en)},
      dest: {...rt.dest, en: toSentenceCase(rt.dest.en)},
      stops: batchTranslateStop(rt.stops[selectedCo], rt.fares),
      freq: getFrequency(rt.freq)
    }
  )
}

// Console log raw data for route details 
const consoleLogRt = rt => console.log(_.find(Object.values(data.routeList), { route: rt }))


module.exports = { getRouteList, buildRt, buildRtDetails, consoleLogRt }