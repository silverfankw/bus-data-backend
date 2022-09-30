require("dotenv").config();

const {PORT, RAW_DATA_SOURCE, SPECIAL_SERVICE_SOURCE} = process.env
const express = require('express')
const router = express().use(express.json())

const { connectMongo } = require('./mongoClient')
const { fetch } = require('./util/common')
const { printInfo, printError } = require("./util/logger")
const { initMiddlewares } = require("./handler/middleware-handler")
const { startCronjob } = require("./service/cron-service")

const fetchRawSource = async () => fetch(RAW_DATA_SOURCE).then(resp => resp.json())

router.listen(PORT, async () => {

  const routeDetails = await fetchRawSource()
  connectMongo()

  try {
    global.routeList = Object.values(routeDetails.routeList)
    global.stopList = routeDetails.stopList
    
    initMiddlewares(router)
    printInfo(`Server running at port ${PORT}...`)

    startCronjob()
  }
  catch (err) {
    printError(err)
  } 
})
