const express = require('express')
const router = express().use(express.json())

const { PORT, RAW_DATA_SOURCE, connectMongo } = require('./config')
const { initAllHandler } = require("./handler/handler-group")

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const setup = async () => fetch(RAW_DATA_SOURCE).then(resp => resp.json())

setup().then(data => {
  router.listen(PORT,  () => {
    try {
      global.data = data
      connectMongo()
      initAllHandler(router)
      console.log(`Server running at port ${PORT}...`)
    }
    catch (err) {
      console.log(err)
    } 
  })
})
