const {isFalsy, strToTime, secToMin} = require("../util/common")

const freqMap = {
  "31": "Monday - Friday (NLB 11)",
  "287": "Monday - Friday",
  "288": "Saturday",
  "319": "Monday - Saturday",
  "320": "Sunday & Public Holiday",
  "448": "Sunday & Public Holiday",
  "480": "Saturday & Sunday",
  "511": "Everyday",
}

const destructureFreqRange = freqRange => 
  Object.entries(freqRange).map(freq => {
    const [from, to, interval = "Fixed Departure"] = freq.flat()

    if (isFalsy(to)) return {time_range: `${strToTime(from)}`, interval}
    else return {time_range: `${strToTime(from)} - ${strToTime(to)}`, interval: `${secToMin(interval)} mins`}
  })


const getFrequency = freqGrp => 
isFalsy (freqGrp) ? {} :
Object.entries(freqGrp).map(freqData => {
  const dayType = freqMap[freqData[0]]
  const dayOfWeekFreq = freqData[1]
  return {day_type: dayType, detail: destructureFreqRange(dayOfWeekFreq)}
})

module.exports = {getFrequency}