const jwt = require("jsonwebtoken")
const { HTTP_STATUS_CODE } = require("../config/constants")

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"]

    if (!token) {
      return res
        .status(HTTP_STATUS_CODE.UNAUTHORIZED)
        .json({ message: "Token not found", success: false })
    }
    const bearer = token.split(" ")
    const bearerToken = bearer[1]
    const decode = jwt.verify(bearerToken, process.env.JWT_SECRET)
    req.user = decode.user.id

    next()
  } catch (e) {
    throw new Error("Something went wrong when verifying token")
  }
}
