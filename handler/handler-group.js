const routeHandler = require("./route-handler")
const stopHandler = require("./stop-handler")
const errorHandler = require("./error-handler")
const accHandler = require("./acc-handler")
const coHandler = require("./co-handler")


const initAllHandler = router => {
  router.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "http://localhost:3000"})
    res.header({"Access-Control-Allow-Headers": "Content-Type"})
    next()
  })

  coHandler.init(router)
  routeHandler.init(router)
  stopHandler.init(router)
  accHandler.init(router)
  console.log("Endpoints Initialized.")
}

module.exports = { routeHandler, stopHandler, errorHandler, initAllHandler }