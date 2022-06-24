const express = require('express')
const app = express()
const LZUTF8 = require('lzutf8')

const { PORT, rawDataSource } = require('./config')
const { routeService: rtSvc } = require('./service/service-group')
const { initAllHandler } = require("./handler/handler-group")

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const setup = async () => {
  return fetch(rawDataSource).then(resp => resp.json())
}

setup().then(data => {
  app.listen(PORT,  () => {
    initAllHandler(app)
    console.log(`Server running at port ${PORT}...`)
    global.data = data
    
    // rtSvc.consoleLogRt("A31")
  })
})
