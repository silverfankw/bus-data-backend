const _ = require("lodash")

const translate = stopID => {
  // console.log(stopID)
  return data.stopMap[stopID]
}

module.exports = { translate }