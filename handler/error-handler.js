const { currentDateTime } = require("../util")

/*  error(...) defines the response code and response message
    res: response */

const error = (res, statusCode, msg = "Error occurs.") => 
    res.status(statusCode).json({
        error_msg: msg, 
        timestamp: Date.now(),
        fdatetime: currentDateTime()
    }).end() 

const errorWithLog = (res, statusCode, msg = "Error occurs.") => {
    console.log(msg)
    console.trace()
    error(res, statusCode, msg)
}

module.exports = {error, errorWithLog}

// new Date().toISOString().replace('T', ' ').substr(0, 19)