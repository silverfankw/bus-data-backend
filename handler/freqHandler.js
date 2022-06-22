const util = require("../util")

const freqMap = {
  "287": "Mon - Fri",
  "288": "Sat",
  "448": "Sun & Public Holiday",
  "480": "Sat - Sun"
}

const getFrequency = freqGrp => 

  Object.entries(freqGrp).map(freqMap => {
    const dayType = freqMap[0]
    const freq = freqMap[1]
    console.log(freqMap)
    Object.entries(freq).map(freq => {
      freq = freq.flat()
      // console.log(freq)
      from = freq[0]
      to = freq[1]
      period = freq[2] ?? "fixed"

      if (util.isNull(to)) {
        const staticDeparture = util.strToTime(from)
        return {dayType, from: staticDeparture, to: staticDeparture, period}
      }
      else {
        return {dayType, from: util.strToTime(from), to: util.strToTime(to), period: util.secToMin(period)}
      } 
   })
  })

module.exports = {getFrequency}