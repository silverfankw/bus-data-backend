const _ = require("lodash")

const init = router => {
  
  // Stop List
  router.get("/stops", (req, res) => {
    const { name } = req.query

    const stops = _.isEmpty(name) ? Object.values(stopList) :
      _.filter(Object.values(stopList), stop => stop.name.zh.match(`${name}`) || stop.name.en.match(`${name}`))

    res.json(stops)
  })
}

module.exports = { init }