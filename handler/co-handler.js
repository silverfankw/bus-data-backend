const init = router => {
  // Company List
  router.get("/companies", (req, res) => {
    res.json(getCompanyList(routeList))
  })
}

module.exports = {init}