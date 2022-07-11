const getFareByIndex = (index, fares) => fares === null ? ({fare: null}) : ({fare: fares[index]})

module.exports = {getFareByIndex}