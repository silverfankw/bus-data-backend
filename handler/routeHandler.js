const coHandler = require("./companyHandler")
const stopHandler = require("./stopHandler")


const buildRoute = rt => (
  {
      co: coHandler.joinCompany(rt.co),
      route: rt.route,
      orig: rt.orig,
      dest: rt.dest
  }
)

const buildRouteDetails = rt => {
  console.log(rt.stops)
  return (
  {
    co: coHandler.joinCompany(rt.co),
    route: rt.route,
    orig: rt.orig,
    dest: rt.dest,
    stops: stopHandler.translate(rt.stops[rt.co[0]])
  }
)
}

module.exports = {buildRoute, buildRouteDetails}