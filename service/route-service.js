const { SPECIAL_SERVICE_SOURCE } = process.env

const { stringifyCompany } = require("./co-service") 
const { batchTranslateStop } = require("./stop-service")
const { getFrequency } = require("./freq-service")
const { toSentenceCase, isFalsy, fetch } = require("../util/common")
const { printRouteDetails } = require("../util/logger")

const color = require("../util/color_def")
const routeDef = require("../util/route_def")


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

  if (isFalsy(co)) return mapRoute(rts)
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
  // printRouteDetails(rt)
  return (
    {
      co: stringifyCompany(rt.route, rt.co),
      bg_color: getRouteBgColor(rt.route, rt.co),
      text_color: getRouteTextColor(rt.route, rt.co),
      route: rt.route,
      service_type: rt.serviceType,
      bound: rt.bound[selectedCo] === "i" ? "inbound" : rt.bound[selectedCo] === "o" ? "outbound" : rt.bound[selectedCo],
      orig: {...rt.orig, en: toSentenceCase(rt.orig.en)},
      dest: {...rt.dest, en: toSentenceCase(rt.dest.en)},
      stops: batchTranslateStop(rt.stops[selectedCo] ?? rt.stops[rt.co[1]], rt.fares),
      freq: getFrequency(rt.freq)
    }
  )
}


const getRouteSpecialService = async (rt, bound) => {
  const special_service = await fetch(`${SPECIAL_SERVICE_SOURCE}&route=${rt}&bound=${bound}`).then(resp => resp.json())
  console.log(special_service)
  return special_service
}


const getRouteBgColor = (rt, co) => {
  // Get only the first company
  switch(co[0]) {
    case "kmb":
      if (routeDef.IS_REGULAR_ROUTE(rt)) return color.DEFAULT
    case "ctb":
      if (routeDef.IS_REGULAR_ROUTE(rt)) return color.LIGHT_BLUE
    case "nwfb":
      if (routeDef.IS_REGULAR_ROUTE(rt)) return color.PURPLE
    case "nlb":
      if (routeDef.IS_REGULAR_ROUTE(rt)) return color.EGYPTIAN_BLUE
    default:
      if (routeDef.IS_RED_BG(rt)) return color.RED
      if (routeDef.IS_CITYFLYER_ROUTE(rt)) return color.DARK_RED
      if (routeDef.IS_WHC_ROUTE(rt)) return color.GREEN
      if (routeDef.IS_OVERNIGHT_ROUTE(rt))  return color.BLACK
      if (routeDef.IS_LWB_AIRPORT_ROUTE(rt)) return color.ROYAL_BLUE
      if (routeDef.IS_LWB_EXTERNAL_ROUTE(rt) || routeDef.IS_LWB_S_ROUTE(rt)
        || routeDef.IS_LWB_EVENT_ROUTE(rt)) 
        return color.ORANGE
      else return color.DEFAULT
  }
}

const getRouteTextColor = (rt, co) => {
  // Get only the first company
  switch(co[0]) {
    case "kmb":
    case "ctb":
    case "nwfb":
    default:
      if (routeDef.IS_CTB_NWFB_OVERNIGHT_ROUTE(rt)) return color.CANARY
      if (routeDef.IS_LWB_AIRPORT_ROUTE(rt) || routeDef.IS_LWB_AIRPORT_OVERNIGHT_ROUTE(rt)
        || routeDef.IS_NLB_OVERNIGHT_ROUTE(rt)) 
        return color.YELLOW
      else return color.WHITE
  }
}

module.exports = { getRouteList, buildRt, buildRtDetails, getRouteBgColor, getRouteTextColor, getRouteSpecialService}