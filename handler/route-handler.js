const _ = require("lodash")
const { getRouteList, buildRtDetails } = require("../service/route-service")
const { verifyAccess } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const init = router => {

  // Route List
  router.get("/routes", (req, res) => {
    const { co } = req.query
    res.json(getRouteList(co, routeList))
  })


  // Route Details
  router.get("/routes/details", async (req, res) => {

    if (_.isEmpty(req.query)) return error(res, 400, "Request Params missing co / route parameters.")

    const { co, route, bound } = req.query
    
    // const token = req.get("X-jwt-token")
    // if (!await verifyAccess(token)) return errorWithLog(res, 401, "Token expires. Please log in again.")

    const query = { co: co.trim().toLowerCase().split(","), route: route.trim().toUpperCase(), ...(bound && {bound: { [co]: bound }}) }

    const rtList = _.filter(routeList, query).map(rt => buildRtDetails(rt, co))
    if (rtList.length) res.json(rtList)
    else return errorWithLog(res, 404, "Route not found.")
  })
}

module.exports = { init }