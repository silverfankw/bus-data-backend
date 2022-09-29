const { error, errorWithLog } = require("./error-handler")
const mongoService = require("../service/mongo-service")

const init = router => {
  router.post("/mongo/load-data", async (req, res, next) => {
    const {ok, message} = await mongoService.constructRouteData(res)

    if (ok) res.status(201).json({message})
    else res.status(500).json({message})
  })
}

module.exports = { init }