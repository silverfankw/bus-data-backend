/*  error(...) defines the response code and response message
    res: response */
const error = (res, statusCode, msg) => res.status(statusCode).json({"error_msg": msg}).end() 

module.exports = {error}