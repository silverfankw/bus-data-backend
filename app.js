const express = require('express')
const LZUTF8 = require('lzutf8')
const cfg = require('./config')
const route = require("./route")
const app = express()

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const setup = async () => {
  return fetch(cfg.rawData).then(resp => resp.json())
}

setup().then(data => {
  app.listen(cfg.port,  () => {
    // console.log(Object.values(data.routeList))
    route.init(app)
    console.log(`Server running at port ${cfg.port}...`)
    global.data = data
  })
})
