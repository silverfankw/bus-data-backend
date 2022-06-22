const express = require('express')
const LZUTF8 = require('lzutf8')

const cfg = require('./config')
const route = require("./route")
const { printRt } = require('./handler/routeHandler')
const app = express()


const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const setup = async () => {
  return fetch(cfg.rawData).then(resp => resp.json())
}

setup().then(data => {
  app.listen(cfg.port,  () => {
    route.init(app)
    console.log(`Server running at port ${cfg.port}...`)
    global.data = data
    
    // console.log(Object.keys(data))
    printRt("A31")
  })
})
