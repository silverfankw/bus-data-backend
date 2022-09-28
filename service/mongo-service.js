const { error, errorWithLog } = require("../handler/error-handler")
const { RouteDetails } = require("../model/RouteDetails")
const { getRouteBgColor, getRouteTextColor } = require("./route-service")

const { stringifyCompany } = require("./co-service") 
const { batchTranslateStop } = require("./stop-service")
const { getFrequency } = require("./freq-service")
const { toSentenceCase, isNull } = require("../util/common")



const constructRouteData = async () => {

  const insert_result = await RouteDetails.insertMany(routeList.map(rt => {
    return {
    co: stringifyCompany(rt.route, rt.co),
    bg_color: getRouteBgColor(rt.route, rt.co),
    text_color: getRouteTextColor(rt.route, rt.co),
    route: rt.route,
    service_type: rt.serviceType,
    bound: rt.bound[rt.co[0]] ?? rt.bound[rt.co[1]],
    orig: {...rt.orig, en: toSentenceCase(rt.orig.en)},
    dest: {...rt.dest, en: toSentenceCase(rt.dest.en)},
    stops: batchTranslateStop(rt.stops[rt.co[0]] ?? rt.stops[rt.co[1]], rt.fares),
    freq: getFrequency(rt.freq)
  }}), (err, data) => console.log(err))

  return insert_result
}


module.exports = { constructRouteData }