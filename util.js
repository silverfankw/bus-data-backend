const isNull = v => v === null || v === undefined

const strToTime = (str, format = "$1:$2") => str.replace(/(\d{2})(\d{2})/, format)

const secToMin = sec => `${String(sec / 60)}m`

module.exports = {isNull, strToTime, secToMin}