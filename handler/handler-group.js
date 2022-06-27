const { verifyAccess } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const routeHandler = require("./route-handler")
const stopHandler = require("./stop-handler")
const errorHandler = require("./error-handler")
const accHandler = require("./acc-handler")

const initAllHandler = router => {
  // router.use(async (req, res, next) => {
  //   if (!req.body) errorWithLog(res, 401, "Request body missing token.")
  //   try { await verifyAccess(token) }
  //   catch (err) { errorWithLog(res, 401, "Token expires. Please log in again.") }
  //   next()
  // })
  routeHandler.init(router)
  stopHandler.init(router)
  accHandler.init(router)
  console.log("Endpoints Initialized.")
}

module.exports = { routeHandler, stopHandler, errorHandler, initAllHandler }