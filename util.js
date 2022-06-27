const regex = {
  capitalizeFirst: /\B[A-Z]|('S)/g,
  isFourDigit: /(\d{2})(\d{2})/
}

const isNull = v => v === null || v === undefined

const strToTime = (str, format = "$1:$2") => str.replace(regex.isFourDigit, format)

const secToMin = sec => `${String(sec / 60)}`

const capitalizeFirst = str => str.replace(regex.capitalizeFirst, ch => ch.toLowerCase())

const currentDateTime = () => new Date().toLocaleString("zh-hk", 
      {year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: "2-digit", second: "numeric"})

module.exports = {isNull, strToTime, secToMin, capitalizeFirst, currentDateTime}
