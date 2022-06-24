const _ = require("lodash")
const { routeService: rtSvc } = require("../service/service-group")
const { error } = require("./error-handler")

const init = app => {

  // Route List
  app.get("/routes", (req, res) => {
    const { co } = req.query

    const rtList = _.isEmpty(co) ?
      _.map(_.filter(Object.values(data.routeList), req.query), buildRt) :
      _.map(_.filter(Object.values(data.routeList), { ...req.query, co: co.split(",") }), rtSvc.buildRt)

    res.json(rtList)
  })


  // Route Details
  app.get("/routes/details", (req, res) => {

    if (_.isEmpty(req.query)) 
      return error(res, 400, "co & route parameters are required.")
  
    const { co, route, bound = 'O' } = req.query
    const query = { co: co.trim().split(","), route: route.trim().toUpperCase(), bound: { [co]: bound } }

    const rtList =
      _.map(
        _.filter(Object.values(data.routeList), query),
        rt => rtSvc.buildRtDetails(rt, co))

    res.json(rtList)
  })
}

module.exports = { init }