const { getCompanyList } = require("../service/co-service")

const init = router => {
  // Company List
  router.get("/companies", (req, res) => {
    const companyList = getCompanyList()
    if (companyList) res.json(companyList)
    else res.status(400).json({"message": "Companies not found."})
  })
}

module.exports = {init}