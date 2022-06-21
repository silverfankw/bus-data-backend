const _ = require("lodash")
const rtHandler = require("./handler/routeHandler")


const init = app => {

  // Route List
  app.get("/routes", (req, res) => {
    const {co} = req.query

    const rtList = _.isEmpty(co) ?
      _.map(_.filter(Object.values(data.routeList), req.query), rtHandler.buildRoute):
      _.map(_.filter(Object.values(data.routeList), {...req.query, co: co.split(",")}), rtHandler.buildRoute)
    
    res.json(rtList)
  })


  // Route Details
  app.get("/routes/details", (req, res) => {
    const {co, route} = req.query

    if (_.isEmpty(req.query)) {
      res.statusMessage = "co & route are required."
      res.status(400).end()
    }

    const rtList = 
      _.map(_.filter(Object.values(data.routeList), {...req.query, co: co.split(",")}), rtHandler.buildRouteDetails)
    
    res.json(rtList)
  })


  // Stop List
  app.get("/stops", (req, res) => {
    const { name } = req.query

    const stopList = _.isEmpty(name) ?
      Object.values(data.stopList) :
      _.filter(Object.values(data.stopList), stop => stop.name.zh.match(`${name}`) || stop.name.en.match(`${name}`))

      res.json(stopList)
  }) 

  console.log("Endpoints Initialized.")
}

module.exports = {init}