const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: {type: String, default: null, unique: true},
  email: {type: String, default: null, unique: true},
  password: {type: String},
  register_at: {type: Number},
  last_login_at: {type: Number},
  token: {type: String}
}, {versionKey: false})

module.exports = mongoose.model("account", accountSchema);