const bcrypt = require("bcryptjs/dist/bcrypt");
const Account = require("../model/account");

const getUser = async filter => await Account.findOne(filter)

const createUser = async (username, email, password) => 
  await Account.create({
    username,
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
    register_at: Date.now(),
  });

const updateUser = async (filter, update) => await Account.updateOne(filter, update)

const verifyAccess = async (username, token) => await Account.findOne({username, token})

module.exports = {createUser, getUser, updateUser, verifyAccess}