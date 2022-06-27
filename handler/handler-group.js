const { verifyAccess } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const routeHandler = require("./route-handler")
const stopHandler = require("./stop-handler")
const errorHandler = require("./error-handler")
const accHandler = require("./acc-handler")

const initAllHandler = router => {
  routeHandler.init(router)
  stopHandler.init(router)
  accHandler.init(router)
  console.log("Endpoints Initialized.")
}

module.exports = { routeHandler, stopHandler, errorHandler, initAllHandler }