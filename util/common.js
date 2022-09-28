const regex = {
  sentenceCase: /\B[A-Z]|('S)/g,
  isFourDigit: /(\d{2})(\d{2})/,
  startWithN: /(^N)(\d|[A-Z]){1,4}/, // Start with 'N', with immidiate at most 1-4 character alphabet / number follow after
  startFrom1: /(^1)(\d){2}([A-Z])?/, // Start with '1', with immidiate subsequent 2 digits, and optional character alphabet
  startFrom3: /(^3)(\d){2}([A-Z])?/, // Start with '3', with immidiate subsequent 2 digits, and optional character alphabet
  startFrom6: /(^6)(\d){2}([A-Z])?/, // Start with '6', with immidiate subsequent 2 digits, and optional character alphabet
  startFrom9: /(^9)(\d|[A-Z]){2,4}/ // Start with '9', with immidiate subsequent 2 digits, and optional character alphabet
}

const isNull = v => v === null || v === undefined

const strToTime = (str, format = "$1:$2") => str.replace(regex.isFourDigit, format)

const secToMin = sec => `${String(sec / 60)}`

const toSentenceCase = str => str.replace(regex.sentenceCase, ch => ch.toLowerCase())

const currentDateTime = () => new Date().toLocaleString("zh-hk", 
      {year: "numeric", month: "2-digit", day: "2-digit", hour: '2-digit', minute: "2-digit", second: "numeric"})

module.exports = {isNull, strToTime, secToMin, toSentenceCase, currentDateTime}
