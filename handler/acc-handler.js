const _ = require('lodash');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");

const Account = require("../model/account");
const { createUser, getUser } = require("../service/acc-service")
const { error, errorWithLog } = require("./error-handler")

const init = router => {
  router.post("/register", async (req, res) => {
    try {
      const {username, email, password} = req.body
      if (!(username && email && password)) return error(res, 400, "Missing required field.")

      if (await getUser({username})) return error(res, 409, "User Already Exist.")
 
      const user = await createUser({
        username,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, 10),
        register_at: Date.now()
      });

      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        { expiresIn: "1h" }
      );

      res.status(201).json({message: `User *${username}* create successful.`, token})
    }
    catch (err) {
      return errorWithLog(res, 500, `Internal server error: ${err}`)
    }
  }) 
  
  router.post("/login", async (req, res) => {
      try {
        const { username, password } = req.body;
        if (!(username && password)) return error(res, 400, "Missing username or password.");
  
        const user = await Account.findOne({username});
        if (!user) return error(res, 401, "No account match.")

        if (!await bcrypt.compare(password, user.password)) return error(res, 401, "Incorrect password.")

        const token = jwt.sign(
            { user_id: user._id, username}, 
            process.env.TOKEN_KEY,
            { expiresIn: "1h" })

        await Account.updateOne({username}, {last_login_at: Date.now(), token})
        res.status(200).json({token})
      }
      catch (err) {
        return errorWithLog(res, 500, `Internal server error: ${err}`)
      }
  })
}

module.exports = { init }