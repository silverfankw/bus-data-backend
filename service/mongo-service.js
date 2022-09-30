const { error, errorWithLog } = require("../handler/error-handler")
const { RouteDetails } = require("../model/RouteDetails")
const { getRouteBgColor, getRouteTextColor } = require("./route-service")

const { stringifyCompany } = require("./co-service") 
const { batchTranslateStop } = require("./stop-service")
const { getFrequency } = require("./freq-service")
const { toSentenceCase, isFalsy } = require("../util/common")



const constructRouteData = () => {

  return new Promise(async (resolve, reject) => {

    const dropSuccess = await RouteDetails.collection.drop()

    if (!dropSuccess) 
      reject({ok: false, message: "Failed to drop table."})
  
    RouteDetails.insertMany(routeList.map(rt => ({
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
    })), (err, data) => {
      if (err) reject({ok: false, message: "Failed to load data to mongo."})
      else resolve({ok: true, message: "Data load successful."})
    })
  })

}


module.exports = { constructRouteData }