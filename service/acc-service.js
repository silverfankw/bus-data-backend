const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../model/account");
const util = require('util');

const jwtVerifyAsync = util.promisify(jwt.verify);

const getUser = async filter => await Account.findOne(filter)

const createUser = async (userDetails) => await Account.create(userDetails);

const updateUser = async (filter, update) => await Account.updateOne(filter, update)

const verifyAccess = async token => await jwtVerifyAsync(token, process.env.TOKEN_KEY).then(decoded => true).catch(err => false)

module.exports = {createUser, getUser, updateUser, verifyAccess}