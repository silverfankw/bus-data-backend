require("dotenv").config();

const {PORT, RAW_DATA_SOURCE} = process.env
const express = require('express')
const router = express().use(express.json())

const { connectMongo } = require('./mongoClient')
const { fetch } = require('./util/common')
const { printInfo, printError } = require("./util/logger")
const { initMiddlewares } = require("./handler/middleware-handler")
const { startCronjob } = require("./service/cron-service")

const fetchSource = async () => fetch(RAW_DATA_SOURCE).then(resp => resp.json())


fetchSource().then(data => {
  connectMongo()

  router.listen(PORT, () => {
    try {
      global.routeList = Object.values(data.routeList)
      global.stopList = data.stopList
      
      initMiddlewares(router)
      printInfo(`Server running at port ${PORT}...`)

      startCronjob()
    }
    catch (err) {
      printError(err)
    } 
  })
})
