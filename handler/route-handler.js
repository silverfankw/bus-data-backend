const _ = require("lodash")
const { getRouteList, buildRtDetails } = require("../service/route-service")
const { verifyAccess } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const init = router => {

  // Route List
  router.get("/routes", (req, res) => {
    const { co } = req.query
    res.json(getRouteList(co.toLowerCase(), Object.values(data.routeList)))
  })


  // Route Details
  router.get("/routes/details", async (req, res) => {

    if (_.isEmpty(req.query)) return error(res, 400, "Request Params missing co / route parameters.")

    const { co, route, bound = 'O'} = req.query
    const { token } = req.body

    if (!await verifyAccess(token)) return errorWithLog(res, 401, "Token expires. Please log in again.")

    const query = { co: co.trim().split(",").toLowerCase(), route: route.trim().toUpperCase(), bound: { [co]: bound } }

    const rtList =
      _.map(
        _.filter(Object.values(data.routeList), query),
        rt => buildRtDetails(rt, co))

    res.json(rtList)
  })
}

module.exports = { init }