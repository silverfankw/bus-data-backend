const {isNull, strToTime, secToMin} = require("../util")

const freqMap = {
  "287": "Monday - Friday",
  "288": "Saturday",
  "319": "",
  "448": "Sunday & Public Holiday",
  "480": "Saturday & Sunday"
}

const destructureFreqRange = freqRange => 
  Object.entries(freqRange).map(freq => {
    const [from, to, period = "Fixed Departure"] = freq.flat()

    if (isNull(to)) {
      const staticDeparture = strToTime(from)
      return ({from: staticDeparture, to: staticDeparture, period})
    }
    else {
      return {from: strToTime(from), to: strToTime(to), period: secToMin(period)}
    } 
  })


const getFrequency = freqGrp => 
  Object.entries(freqGrp).map(freqData => {
    const dayType = freqMap[freqData[0]]
    const dayOfWeekFreq = freqData[1]
    return {day_type: dayType, range: destructureFreqRange(dayOfWeekFreq)}
  })

module.exports = {getFrequency}