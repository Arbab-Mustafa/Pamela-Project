const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const Stripe = require("stripe")
const randomString = require("randomstring")
const { HTTP_STATUS_CODE, websiteUrl } = require("../config/constants")
const mail = require("../nodemailer/mail")
const User = require("../models/user")

const stripe = Stripe(process.env.STRIPE_KEY)

const get = async (req, res) => {
  try {
    let page = Number(req.query.page)
    let limit = Number(req.query.limit)
    let queryData = {}
    const searchData = req.query.search?.toLowerCase()
    if (!page) page = 1
    if (!limit) limit = 10
    const skip = (page - 1) * limit
    let countDocuments = await User.countDocuments()
    const request = await User.find({})
      .sort({ createdAt: "descending" })
      .skip(skip)
      .limit(limit)
      .populate("serviceDetails", ["title"])
      .populate("companyOwned")
      .select("-password")
      .select("-forgetToken")

    if (req.query?.search?.toString().trim() !== "" && req.query.search) {
      queryData = request.filter(
        (e) =>
          e.firstName?.toLowerCase().includes(searchData) ||
          e.lastName?.toLowerCase().includes(searchData) ||
          e.email?.toLowerCase().includes(searchData) ||
          e.id?.toLowerCase().includes(searchData) ||
          e.stripeId?.toLowerCase().includes(searchData) ||
          e.phone?.toLowerCase().includes(searchData) ||
          (e.serviceDetails.length > 0 &&
            e.serviceDetails.find((el) =>
              el.title?.toLowerCase().includes(searchData)
            )) ||
          e.price?.toLowerCase().includes(searchData)
      )
      countDocuments = queryData.length
    } else {
      queryData = request
    }
    let nextPage
    if (page * limit > countDocuments) {
      nextPage = false
    } else {
      nextPage = true
    }
    res.status(200).json({
      success: true,
      status: HTTP_STATUS_CODE.OK,
      data: queryData,
      message: "Successfully ",
      page,
      limit,
      length: countDocuments,
      skip,
      nextPage,
      prevPage: page !== 1,
    })
  } catch (e) {
    res.json({ success: false, message: e.message })
  }
}

const createUser = async (req, res) => {
  try {
    // const errors = validationResult(req).formatWith((message) => message)
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ message: errors.array() })
    // }
    let findEmail = await User.findOne({ email: req.body.email })
    if (findEmail) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Email already Exists!")
    }

    const genSalt = await bcrypt?.genSalt(10)
    const hashPassword = await bcrypt?.hash(req.body.password, genSalt)
    req.body.password = hashPassword

    findEmail = await User.create(req.body)

    const token = {
      user: {
        id: findEmail._id,
      },
    }
    const tokenID = jwt.sign(token, process.env.JWT_SECRET, {
      expiresIn: "1hr",
    })

    await findEmail.save()
    mail(
      findEmail?.email,
      "Welcome to FilthyIdea",
      "",
      true,
      {
        name: `${findEmail?.firstName} ${findEmail.lastName}`,
      },
      1
    )
    await mail(
      process.env.NODE_APP_MAILGUN_MAIL_SENDING,
      "New User Signup",
      `${findEmail?.firstName} is signup to our Website with this email address ${findEmail.email}`
    )
    return res.status(HTTP_STATUS_CODE.CREATED).json({
      success: true,
      data: {
        firstName: findEmail.firstName,
        lastName: findEmail.lastName,
        email: findEmail.email,
        isAdmin: findEmail.isAdmin,
        phone: findEmail.phone,
        serviceOwned: findEmail.serviceOwned,
        serviceDetails: findEmail.serviceDetails,
        _id: findEmail._id,
      },
      token: tokenID,
      message: "Successfully Account Created ",
      status: HTTP_STATUS_CODE.CREATED,
    })
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
      status: err.statusCode,
    })
  }
}

const singleUser = async (req, res) => {
  try {
    const { id } = req.params
    const singleUserRequest = await User.findById(id)
      .select("-password")
      .select("-forgetToken")
      .populate("companyOwned")
      .populate("serviceDetails")
    if (!singleUserRequest) {
      res.status(404)
      throw new Error("User not found")
    }
    return res.status(200).json({
      status: HTTP_STATUS_CODE.OK,
      success: true,
      message: "Successfully User fetched ",
      data: singleUserRequest,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const singleUserRequest = await User.findByIdAndRemove(id)
    if (!singleUserRequest) {
      res.status(404)
      throw new Error("User not found")
    }
    if (singleUser?.stripeId) {
      await stripe.customers.del(singleUserRequest.stripeId)
    }
    return res.status(200).json({
      success: true,
      message: "Successfully User Deleted",
      status: HTTP_STATUS_CODE.OK,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const updateUser = async (req, res) => {
  try {
    if (req?.body?.email) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: "Email cannot be edited",
      })
    }
    if (req?.body?.password) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: "Password cannot be edited",
      })
    }
    if (req?.body?.isAdmin) {
      return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({
        success: false,
        message: "Admin cannot be edited",
      })
    }

    const { id } = req.params
    const findId = await User.findById(id)
    const body = {
      firstName: req.body.firstName || findId.firstName,
      lastName: req.body.lastName || findId.lastName,
      phone: req.body.phone || findId.phone,
    }
    const findEmail = await User.findOneAndUpdate(
      { _id: findId._id },
      { ...body },
      {
        new: true,
      }
    )
      .select("-password")
      .select("-forgetToken")
    if (!findEmail) {
      res.status(404)
      throw new Error("Email already Exists!")
    }
    await findEmail.save()
    return res.status(HTTP_STATUS_CODE.OK).json({
      status: HTTP_STATUS_CODE.OK,
      user: findEmail,
      success: true,
      message: "Successfully User Updated ",
    })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}
const makeAdmin = async (req, res) => {
  try {
    const superUser = await User.findById(req.user)
    if (!superUser) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("User Not Found")
    }
    if (superUser?.adminRoleType?.name === "super admin") {
      await User.findOneAndUpdate(
        {
          _id: req?.body?.id,
        },
        { isAdmin: true, adminRoleType: { name: "admin", _id: req.body.id } },
        { new: true }
      )

      return res.status(HTTP_STATUS_CODE.OK).json({
        status: HTTP_STATUS_CODE.OK,
        success: true,
        data: "Admin Updated",
        message: "Admin successfully Added",
      })
    }
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}
const removeAdmin = async (req, res) => {
  try {
    const superUser = await User.findById(req.user)
    if (!superUser) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("User Not Found")
    }
    if (superUser?.adminRoleType?.name === "super admin") {
      await User.findOneAndUpdate(
        {
          _id: req?.body?.id,
        },
        { isAdmin: false, adminRoleType: null },
        { new: true }
      )

      return res.status(HTTP_STATUS_CODE.OK).json({
        status: HTTP_STATUS_CODE.OK,
        success: true,
        data: "Admin Updated",
        message: "Admin successfully removed",
      })
    }
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

const forgetPassword = async (req, res) => {
  try {
    let findEmail = await User.findOne({ email: req.body.email }).select(
      "-password"
    )
    if (!findEmail) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Email not found")
    }
    const randomToken = randomString.generate()
    findEmail = await User.findOneAndUpdate(
      { email: req.body.email },
      { forgetToken: randomToken },
      { new: true }
    )
    mail(
      req.body.email,
      "Reset Password",
      "",
      true,
      {
        name: `${findEmail?.firstName} ${findEmail.lastName}`,
        token: findEmail?.forgetToken,
        websiteUrl,
      },
      2
    )
    return res.status(201).json({
      status: HTTP_STATUS_CODE.OK,
      data: { token: findEmail.forgetToken },
      success: true,
      message: "Reset password mail sent to your given email",
    })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

const resetPassword = async (req, res) => {
  try {
    const verifyPass = await User.findOne({
      forgetToken: req.body.forgetToken,
    }).select("_id")

    if (!verifyPass) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Token not verified")
    }
    const genSalt = await bcrypt?.genSalt(10)
    const hashPassword = await bcrypt?.hash(req.body.newPassword, genSalt)
    req.body.password = hashPassword
    await User.findOneAndUpdate(
      {
        forgetToken: req.body.forgetToken,
      },
      {
        password: hashPassword,
        forgetToken: null,
      },
      { new: true }
    )
    return res.status(201).json({
      status: HTTP_STATUS_CODE.OK,
      success: true,
      data: "Password Changed",
      message: "Password successfully changed",
    })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

const verifyToken = async (req, res) => {
  try {
    const verifyPass = await User.findOne({
      forgetToken: req.body.forgetToken,
    }).select("_id")

    if (!verifyPass) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Token not verified")
    }
    return res.status(201).json({
      status: HTTP_STATUS_CODE.OK,
      success: true,
    })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}
const checkToken = async (req, res) => {
  try {
    const verifyPass = await User.findOne({
      id: req.user,
    }).select("_id")

    if (!verifyPass) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Token not verified")
    }
    return res.status(HTTP_STATUS_CODE.OK).json({
      status: HTTP_STATUS_CODE.OK,
      success: true,
    })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

module.exports = {
  get,
  createUser,
  singleUser,
  deleteUser,
  updateUser,
  forgetPassword,
  resetPassword,
  verifyToken,
  checkToken,
  makeAdmin,
  removeAdmin,
}
