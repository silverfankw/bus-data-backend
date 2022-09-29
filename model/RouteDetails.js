const mongoose = require("mongoose");

const RouteDetails = mongoose.model("RouteDetails", {
  co: {en: String, zh: String},
  bg_color: String,
  text_color: String,
  route: String,
  service_type: String,
  bound: String,
  orig: {en: String, zh: String},
  dest: {en: String, zh: String},
  stops: [{name: {en: String, zh: String}, fare: String, stop_no: Number}],
  freq: [{day_type: String, detail: {time_range: String, interval: String}}]
})

module.exports = { RouteDetails }