const _ = require('lodash');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const Account = require("../model/account");
const { createUser, getUser } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const init = router => {
  router.post("/register", async (req, res) => {
    try {
      if (!req.body) return error(res, 400, "Empty request body.")

      const {username, email, password} = req.body
      if (!(username && email && password)) return error(res, 400, "All input is required.")

      if (await getUser({email})) return error(res, 409, "User Already Exist.")
 
      const user = await createUser(username, email.toLowerCase(), password);
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "5m" }
      );
  
      res.status(201).json({message: `User *${username}* create successful.`, token})
    }
    catch (err) {
      errorWithLog(res, 500, `Internal server error: ${err}`)
    }
  }) 
  
  router.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        if (!(email && password)) return error(res, 400, "Missing email or password.");
  
        const user = await Account.findOne({email});
        if (!user) return error(res, 401, "No account match.")

        if (!await bcrypt.compare(password, user.password)) return error(res, 401, "Incorrect password.")

        const token = jwt.sign(
            { user_id: user._id, email}, 
            process.env.TOKEN_KEY,
            { expiresIn: "5m" })

        await Account.updateOne({email}, {last_login_at: Date.now(), token})
        res.status(200).json({token})
      }
      catch (err) {
        errorWithLog(res, 500, `Internal server error: ${err}`)
      }
  })
}

module.exports = { init }