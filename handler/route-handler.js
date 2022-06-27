const _ = require("lodash")
const { buildRt, buildRtDetails } = require("../service/route-service")
const { verifyAccess } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const init = router => {

  // Route List
  router.get("/routes", (req, res) => {
    const { co } = req.query

    const rtList = _.isEmpty(co) ?
      _.map(_.filter(Object.values(data.routeList), req.query), buildRt) :
      _.map(_.filter(Object.values(data.routeList), { ...req.query, co: co.split(",") }), buildRt)

    res.json(rtList)
  })


  // Route Details
  router.get("/routes/details", async (req, res) => {

    if (_.isEmpty(req.query)) return error(res, 400, "Request Params missing co / route parameters.")
    if (_.isEmpty(req.body)) return error(res, 400, "Request body missing token.")

    const { co, route, bound = 'O'} = req.query
    const { token } = req.body

    if (!await verifyAccess(token)) return errorWithLog(res, 401, "Token expires. Please log in again.")

    const query = { co: co.trim().split(","), route: route.trim().toUpperCase(), bound: { [co]: bound } }

    const rtList =
      _.map(
        _.filter(Object.values(data.routeList), query),
        rt => buildRtDetails(rt, co))

    res.json(rtList)
  })
}

module.exports = { init }