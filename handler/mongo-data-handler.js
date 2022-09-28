const { error, errorWithLog } = require("./error-handler")
const mongoService = require("../service/mongo-service")

const init = router => {
  router.post("/mongo/load-data", (req, res, next) => {
    if (mongoService.constructRouteData())
      res.status(201)
    else
      res.status(500)
  })
}

module.exports = { init }