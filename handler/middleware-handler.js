const routeHandler = require("./route-handler")
const stopHandler = require("./stop-handler")
const errorHandler = require("./error-handler")
const coHandler = require("./co-handler")
const mongoDataHandler = require("./mongo-data-handler")
const { printInfo, printError } = require("../util/logger")

// Middleware to transform all query value to lower case
const middleware_query_lowercase = query => 
    Object.entries(query).reduce((result, entry) => (
      {...result, [entry[0]]: entry[1].toLowerCase()}
    ), {})

// Middleware to log every request ip and its query
const middleware_server_request_log = req =>
    printInfo(`'${req.method} ${req.path}' request received from ${req.ip} query ---> ${JSON.stringify(req.query)}`)
    
    
const initMiddlewares = router => {
  router.use((req, res, next) => {
    req.query = middleware_query_lowercase(req.query)
    middleware_server_request_log(req)
    res.header({"Access-Control-Allow-Origin": "http://localhost:3000"})
    res.header({"Access-Control-Allow-Headers": ["x-jwt-token", "Content-Type"]})
    next()
  })

  coHandler.init(router)
  routeHandler.init(router)
  stopHandler.init(router)
  mongoDataHandler.init(router)
}

module.exports = { routeHandler, stopHandler, errorHandler, initMiddlewares }