const _ = require("lodash")

const { getRouteList, buildRtDetails, getRouteSpecialService } = require("../service/route-service")
const { hasFalsy } = require("../util/common")
const { error, errorWithLog } = require("./error-handler")

const init = router => {

  // Route List
  router.get("/routes", (req, res) => {
    const { co } = req.query
    res.json(getRouteList(co, routeList))
  })

  // Route Details
  router.get("/routes/details", async (req, res) => {

    if (hasFalsy(co, route)) return error(res, 400, "Request Params missing co / route parameters.")

    const { co, route, bound } = req.query

    const query = { 
      co: co.trim().toLowerCase().split(","), route: route.trim().toUpperCase(), 
      ...(bound && {bound: { [co]: bound.toUpperCase() }}) }

    const rtList = _.filter(routeList, query).map(rt => buildRtDetails(rt, co))

    if (rtList.length) 
      res.json(rtList) 
    else 
      return errorWithLog(res, 404, "Route not found.")
  })

  // Route Special Service
  router.get("/routes/special-service", async (req, res) => {
    const { co, route, bound } = req.query

    if (hasFalsy(co, route, bound)) return error(res, 400, "Request Params missing co / route / bound parameters.")
    else {
      res.status(200).json(getRouteSpecialService(co, bound))
    }
  })
}

module.exports = { init }