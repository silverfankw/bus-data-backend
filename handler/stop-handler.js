const _ = require("lodash")

const init = router => {
  
  // Stop List
  router.get("/stops", (req, res) => {
    const { name } = req.query

    const stopList = _.isEmpty(name) ? Object.values(data.stopList) :
      _.filter(Object.values(data.stopList), stop => stop.name.zh.match(`${name}`) || stop.name.en.match(`${name}`))

    res.json(stopList)
  })
}

module.exports = { init }