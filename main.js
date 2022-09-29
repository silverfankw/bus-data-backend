const express = require('express')
const router = express().use(express.json())

const { PORT, RAW_DATA_SOURCE, connectMongo } = require('./config')
const { printInfo, printError } = require("./util/logger")
const { initAllHandler } = require("./handler/handler-group")
const { startCronjob } = require("./service/cron-service")

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const setup = async () => fetch(RAW_DATA_SOURCE).then(resp => resp.json())


setup().then(data => {
  connectMongo()

  router.listen(PORT, () => {
    try {
      global.routeList = Object.values(data.routeList)
      global.stopList = data.stopList
      
      initAllHandler(router)
      printInfo(`Server running at port ${PORT}...`)

      startCronjob()
    }
    catch (err) {
      printError(err)
    } 
  })
})
