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

    const { co, route, bound = 'O'} = req.query
    const token = req.get("X-jwt-token")

    if (!await verifyAccess(token)) return errorWithLog(res, 401, "Token expires. Please log in again.")

    const query = { co: co.trim().toLowerCase().split(","), route: route.trim().toUpperCase(), bound: { [co]: bound } }

    const rtList = _.filter(routeList, query).map(rt => buildRtDetails(rt, co))
    res.json(rtList)
  })
}

module.exports = { init }