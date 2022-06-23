const _ = require("lodash")
const rtHandler = require("./handler/routeHandler")


const init = app => {

  // Route List
  app.get("/routes", (req, res) => {
    const { co } = req.query

    const rtList = _.isEmpty(co) ?
      _.map(_.filter(Object.values(data.routeList), req.query), rtHandler.buildRt) :
      _.map(_.filter(Object.values(data.routeList), { ...req.query, co: co.split(",") }), rtHandler.buildRt)

    res.json(rtList)
  })


  // Route Details
  app.get("/routes/details", (req, res) => {

    if (_.isEmpty(req.query)) {
      return res.status(400).json({ "error_msg": "co & route parameters are required." }).end()
    }

    const { co, route, bound = 'O' } = req.query
    const query = { co: co.trim().split(","), route: route.trim().toUpperCase(), bound: { [co]: bound } }

    const rtList =
      _.map(
        _.filter(Object.values(data.routeList), query),
        rt => rtHandler.buildRtDetails(rt, co))

    res.json(rtList)
  })


  // Stop List
  app.get("/stops", (req, res) => {
    const { name } = req.query

    const stopList = _.isEmpty(name) ? Object.values(data.stopList) :
      _.filter(Object.values(data.stopList), stop => stop.name.zh.match(`${name}`) || stop.name.en.match(`${name}`))

    res.json(stopList)
  })

  console.log("Endpoints Initialized.")
}

module.exports = { init }