const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const { HTTP_STATUS_CODE } = require("../config/constants")
const User = require("../models/user")

const login = async (req, res) => {
  let request = await User.findOne({ email: req?.body?.email })
  try {
    if (!request) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Email not found")
    }
    const verifyPassword = await bcrypt?.compare(
      req?.body?.password,
      request?.password
    )
    if (!verifyPassword) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("password not Valid")
    }
    const token = {
      user: {
        id: request.id,
      },
    }
    const generateToken = jwt.sign(token, process.env.JWT_SECRET, {
      expiresIn: "24hr",
    })
    request = await User.findOne({ email: req?.body?.email })
      .select("-password")
      .populate("companyOwned")
    return res?.status(200).json({
      message: "User Login Successfully",
      success: true,
      status: HTTP_STATUS_CODE.OK,
      user: request,
      token: generateToken,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const refreshToken = async (req, res) => {
  try {
    const findUser = await User.findById(req.user)
      .select("-password")
      .select("-forgetToken")
      .populate("companyOwned")
    if (!findUser) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Unable to find token")
    }
    const token = {
      user: {
        id: findUser.id,
      },
    }
    const generateToken = jwt.sign(token, process.env.JWT_SECRET, {
      expiresIn: "24hr",
    })
    return res?.status(200).json({
      message: "Token refresh'",
      success: true,
      status: HTTP_STATUS_CODE.OK,
      user: findUser,
      token: generateToken,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const changePassword = async (req, res) => {
  try {
    if (!req.body.oldPassword) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Unable to find user")
    }
    const findUser = await User.findById(req.body.userId)
    if (!findUser) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Unable to find user")
    }
    const verifyOldPassword = await bcrypt.compare(
      req.body.oldPassword,
      findUser.password
    )

    if (!verifyOldPassword) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Password not Correct")
    }
    const genSalt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt?.hash(req.body.newPassword, genSalt)
    findUser.password = hashPassword
    await findUser.save()
    return res?.status(200).json({
      message: "Password Updated",
      success: true,
      status: HTTP_STATUS_CODE.OK,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

module.exports = {
  login,
  refreshToken,
  changePassword,
}
