const init = app => {
  
  // Stop List
  app.get("/stops", (req, res) => {
    const { name } = req.query

    const stopList = _.isEmpty(name) ? Object.values(data.stopList) :
      _.filter(Object.values(data.stopList), stop => stop.name.zh.match(`${name}`) || stop.name.en.match(`${name}`))

    res.json(stopList)
  })
}

module.exports = { init }