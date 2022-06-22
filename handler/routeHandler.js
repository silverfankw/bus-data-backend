const coHandler = require("./coHandler")
const stopHandler = require("./stopHandler")


const buildRoute = rt => (
  {
      co: coHandler.joinCompany(rt.co),
      route: rt.route,
      orig: rt.orig,
      dest: rt.dest
  }
)

const buildRouteDetails = (rt, selectedCo) => (
  {
    co: coHandler.joinCompany(rt.co),
    route: rt.route,
    bound: rt.bound[selectedCo] === "I" ? "inbound" : rt.bound[selectedCo] === "O" ? "Outbound" : rt.bound[selectedCo],
    orig: rt.orig,
    dest: rt.dest,
    stops: stopHandler.batchTranslate(rt.stops[selectedCo], rt.fares)
  }
)

module.exports = {buildRoute, buildRouteDetails}