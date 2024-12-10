const { HTTP_STATUS_CODE } = require("../config/constants")
const User = require("../models/user")

const adminCondition = async (req, res, next) => {
  try {
    if (req.body.isAdmin === true) {
      const findAdmin = await User.find({ isAdmin: true })
      if (findAdmin.length > 0) {
        res.status(HTTP_STATUS_CODE.BAD_REQUEST)
        throw new Error("One Admin is allowed")
      }
    }
    next()
  } catch (e) {
    return res.json({ message: e.message, success: false })
  }
}
const adminRules = async (req, res, next) => {
  try {
    const adminRequest = await User.findOne({ _id: req.user })
    if (adminRequest.isAdmin === false) {
      res.status(HTTP_STATUS_CODE.UNAUTHORIZED)
      throw new Error("One Admin is allowed")
    }
    next()
  } catch (e) {
    return res.json({ message: e.message, success: false })
  }
}

module.exports = {
  adminCondition,
  adminRules,
}
