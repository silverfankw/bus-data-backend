const routeHandler = require("./route-handler")
const stopHandler = require("./stop-handler")
const errorHandler = require("./error-handler")
const coHandler = require("./co-handler")
const mongoDataHandler = require("./mongo-data-handler")
const { result } = require("lodash")
const { consoleLogRt } = require("../service/route-service")


// Middleware to transform all query value to lower case
const middleware_query_lowercase = query => 
    Object.entries(query).reduce((result, entry) => (
      {...result, [entry[0]]: entry[1].toLowerCase()}
    ), {})

    
const initAllHandler = router => {
  router.use((req, res, next) => {
    req.query = middleware_query_lowercase(req.query)
    res.header({"Access-Control-Allow-Origin": "http://localhost:3000"})
    res.header({"Access-Control-Allow-Headers": ["x-jwt-token", "Content-Type"]})
    next()
  })

  coHandler.init(router)
  routeHandler.init(router)
  stopHandler.init(router)
  mongoDataHandler.init(router)
  console.log("Endpoints Initialized.")
}

module.exports = { routeHandler, stopHandler, errorHandler, initAllHandler }