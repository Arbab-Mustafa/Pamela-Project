const fs = require("fs")
const path = require("path")
const Stripe = require("stripe")
const User = require("../models/user")
const Order = require("../models/order")
const { HTTP_STATUS_CODE } = require("../config/constants")
const mail = require("../nodemailer/mail")

const stripe = Stripe(process.env.STRIPE_KEY)

const createCheckoutPayment = async (req, res) => {
  // console.log(req.body)
  try {
    const address = {
      city: req.body.city,
      line1: req.body.line1,
      line2: req.body.line1,
      postal_code: req.body.postal_code,
      state: req.body.state,
    }
    const findCustomer = await stripe.customers.list({
      email: req.body.email,
    })
    let customer
    let userUpdate
    let idCustomer
    if (findCustomer.data.length === 0) {
      customer = await stripe.customers.create({
        email: req.body.email,
        name: req.body.cardName,
        phone: req.body.phone,
        source: req.body.stipeToken,
      })
      userUpdate = await User.findOneAndUpdate(
        { _id: req.body.userId },
        {
          stripeId: customer.id,
          userAddress: address,
        },
        { new: true }
      )
      await userUpdate.save()
    }

    if (findCustomer.data.length === 0) {
      idCustomer = customer.id
    } else {
      idCustomer = findCustomer.data[0].id
    }

    const charge = await stripe.charges.create({
      amount: req.body.price * 100,
      currency: "usd",
      description: "new payment",
      customer: await idCustomer,
      metadata: {
        userId: req.body.userId,
        serviceId: req.body.serviceId,
      },
    })
    userUpdate = await User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        serviceOwned: true,
        stripeId:
          findCustomer.data.length === 0
            ? customer.id
            : findCustomer.data[0].id,
        userAddress: address,
      },
      { new: true }
    )
    if (!userUpdate) {
      res.status(404)
      throw new Error("user not found")
    }
    await userUpdate.save()
    const createOrder = await Order.create({
      address,
      cardHolder: req.body.cardName,
      serviceDetails: req.body.serviceDetails,
      userId: req.body.userId,
      serviceId: req.body.serviceId,
      status: charge.paid,
      price: req.body.price,
      orderDetails: req.body.orderDetails,
    })
    userUpdate = await User.findOneAndUpdate(
      { _id: req.body.userId },

      {
        $push: {
          serviceDetails: req.body.serviceId,
          orderDetails: createOrder?._id,
        },
      },
      { new: true }
    )

    await userUpdate.save()
    await createOrder.save()

    await mail(
      req.body.email,
      "Purchase Done",
      "",
      true,
      {
        name: req.body.cardName,
        price: req.body.price,
        orders: req.body.orderDetails,
        serviceName: req.body.serviceDetails?.name,
        id: createOrder?._id,
      },
      3
    )
    await mail(
      process.env.NODE_APP_MAILGUN_MAIL_SENDING,
      "Purchase Information",
      ``,
      {
        name: req.body.cardName,
        price: req.body.price,
        orders: req.body.orderDetails,
        serviceName: req.body.serviceDetails?.name,
      },
      4
    )

    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: createOrder.status,
      success: true,
    })
  } catch (err) {
    // console.log(err)
    res
      .status(err.statusCode || 500)
      .json({ success: false, error: err.message })
  }
}

const getAllOrders = async (req, res) => {
  let body = {}
  let page = Number(req.query.page)
  let limit = Number(req.query.limit)
  if (!page) page = 1
  if (!limit) limit = 10
  const skip = (page - 1) * limit
  if (req.body.userId) {
    body = { userId: req.body.userId }
  } else if (req.body.serviceId) {
    body = { serviceId: req.body.serviceId }
  } else {
    body = {}
  }
  let queryData = {}
  const searchData = req.query.search?.toLowerCase()

  try {
    let countDocuments = await Order.find(body).countDocuments()
    const getOrders = await Order.find(body)
      .sort({ createdAt: "descending" })
      .skip(skip)
      .limit(limit)
      .select({
        _id: 1,
        status: 2,
        price: 3,
        createdAt: 4,
        orderStatusAdmin: 5,
        "serviceDetails.name": 6,
      })
      .populate("userId", ["firstName", "email", "phone", "_id", "stripeId"])
      .populate("serviceId", ["title"])
      .exec()
    if (req.query.search?.toString().trim() !== "") {
      queryData = getOrders.filter(
        (e) =>
          e.userId.firstName?.toLowerCase().includes(searchData) ||
          e.userId.lastName?.toLowerCase().includes(searchData) ||
          e.userId.email?.toLowerCase().includes(searchData) ||
          e.userId.id?.toLowerCase().includes(searchData) ||
          e.userId.stripeId?.toLowerCase().includes(searchData) ||
          e.userId.phone?.toLowerCase().includes(searchData) ||
          e.serviceId?.title?.toLowerCase().includes(searchData) ||
          e.price?.toLowerCase().includes(searchData) ||
          e.id?.toLowerCase().includes(searchData)
      )
      countDocuments = queryData.length
    } else {
      queryData = getOrders
    }
    let nextPage
    if (page * limit > countDocuments) {
      nextPage = false
    } else {
      nextPage = true
    }
    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: queryData,
      success: true,
      page: page,
      limit: limit,
      length: countDocuments,
      skip,
      nextPage,
      prevPage: page !== 1,
    })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
}
const getAllOrdersUsers = async (req, res) => {
  let page = Number(req.query.page)
  let limit = Number(req.query.limit)
  if (!page) page = 1
  if (!limit) limit = 10
  const skip = (page - 1) * limit
  if (!req.body.userId) {
    res.status(HTTP_STATUS_CODE.BAD_REQUEST)
    throw new Error("User_id is required to get the orders")
  }

  try {
    const countDocuments = await Order.find({
      userId: req.body.userId,
    }).countDocuments()
    const getOrders = await Order.find({ userId: req.body.userId })
      .sort({ createdAt: "descending" })
      .skip(skip)
      .limit(limit)
      .select({
        _id: 1,
        status: 2,
        price: 3,
        createdAt: 4,
        orderStatusAdmin: 5,
        "serviceDetails.name": 6,
      })
      .populate("userId", ["firstName"])
      .populate("serviceId", ["title"])
    let nextPage
    if (page * limit > countDocuments) {
      nextPage = false
    } else {
      nextPage = true
    }
    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: getOrders,
      success: true,
      page: page,
      limit: limit,
      length: countDocuments,
      skip,
      nextPage,
      prevPage: page !== 1,
    })
  } catch (err) {
    res.json({ success: false, error: err.message })
  }
}
const getSingleOrder = async (req, res) => {
  try {
    const getOrders = await Order.findById(req.params.id)
      .populate("userId", ["firstName", "email", "stripeId", "phone"])
      .populate("serviceId", ["title"])
    if (!getAllOrders) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Order not found")
    }

    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: getOrders,
      success: true,
    })
  } catch (err) {
    //   switch (err.type) {
    //     case "StripeCardError":
    //       // A declined card error
    // res.json({ success: false, error: err.message ? err.message : err })        break
    //     case "StripeRateLimitError":
    // res.json({ success: false, error: err.message ? err.message : err })        break
    //     case "StripeInvalidRequestError":
    // res.json({ success: false, error: err.message ? err.message : err })        break
    //     case "StripeAPIError":
    // res.json({ success: false, error: err.message ? err.message : err })        break
    //     case "StripeConnectionError":
    //       res.json({ success: false, error: err.message ? err.message : err })
    //       break
    //     case "StripeAuthenticationError":
    //       res.json({ success: false, error: err.message ? err.message : err })
    //       break
    //     default:
    //       break
    //   }
    res
      .status(500)
      .json({ success: false, error: err.message ? err.message : err })
  }
}

const updateSingleOrder = async (req, res) => {
  try {
    let getOrders = await Order.findById(req.params.id)
    if (!getOrders) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Order not found")
    }
    getOrders = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { serviceDetails: req?.body?.serviceDetails },
      { new: true }
    )
    if (!getOrders) {
      res.status(HTTP_STATUS_CODE.BAD_REQUEST)
      throw new Error("Order not found")
    }
    await getOrders.save()

    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: getOrders,
      message: "Order  successfully Updated",
      success: true,
    })
  } catch (err) {
    // console.log(err)
    res
      .status(500)
      .json({ success: false, error: err.message ? err.message : err })
  }
}
const adminFeedback = async (req, res) => {
  let data = {}
  if (req?.body?.deleteFile === "true") {
    try {
      const deleteFile = await Order.findById(req?.params?.id)

      if (deleteFile) {
        fs.unlinkSync(
          path.resolve("./backend/public/assets/upload") +
            `/${deleteFile?.orderImageAdmin?.images}`
        )
        const order2 = await Order.findOneAndUpdate(
          {
            _id: req?.params?.id,
          },
          {
            orderImageAdmin: {
              admin: req?.user,
              images: null,
            },
          }
        )
        await order2.save()
        await mail(
          order2?.email,
          "Service Information",
          ``,
          true,
          {
            name: order2.cardHolder,
            serviceName: order2.serviceDetails?.name,
            id: order2._id,
          },
          5
        )
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, error: err.message ? err.message : err })
    }
  }
  if (req?.file) {
    data = {
      orderStatusAdmin: {
        title: req?.body?.orderStatusAdmin?.title,
        admin: req?.body?.orderStatusAdmin?.admin,
      },
      orderMessageAdmin: {
        title: req?.body?.orderMessageAdmin?.title,
        admin: req?.body?.orderMessageAdmin?.admin,
      },
      orderImageAdmin: {
        images: req?.file?.filename,
        admin: req?.body?.orderImageAdmin?.admin,
      },
    }
  } else {
    data = {
      orderStatusAdmin: {
        title: req?.body?.orderStatusAdmin?.title,
        admin: req?.body?.orderStatusAdmin?.admin,
      },
      orderMessageAdmin: {
        title: req?.body?.orderMessageAdmin?.title,
        admin: req?.body?.orderMessageAdmin?.admin,
      },
    }
  }
  try {
    const feedbackAdmin = await Order.findByIdAndUpdate(
      {
        _id: req?.params?.id,
      },
      data,
      { new: true }
    )
    await feedbackAdmin.save()
    await mail(
      feedbackAdmin.mail,
      "Service Information",
      ``,
      true,
      {
        name: feedbackAdmin.cardHolder,
        serviceName: feedbackAdmin.serviceDetails?.name,
        id: feedbackAdmin._id,
      },
      5
    )
    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: feedbackAdmin,
      success: true,
    })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: err.message ? err.message : err })
  }
}
const userFeedback = async (req, res) => {
  let data = {}
  if (req?.body?.deleteFile === "true") {
    try {
      const deleteFile = await Order.findById(req?.params?.id)

      if (deleteFile) {
        fs.unlinkSync(
          path.resolve("./backend/public/assets/upload") +
            `/${deleteFile?.orderImageUser?.images}`
        )
        const order2 = await Order.findOneAndUpdate(
          {
            _id: req?.params?.id,
          },
          {
            orderImageUser: {
              admin: req?.user,
              images: null,
            },
          }
        )
        await order2.save()
        await mail(
          process.env.NODE_APP_MAILGUN_MAIL_SENDING,

          "Service Information",
          ``,
          true,
          {
            name: order2.cardHolder,
            serviceName: order2.serviceDetails?.name,
            id: order2._id,
          },
          6
        )
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, error: err.message ? err.message : err })
    }
  }
  if (req?.file) {
    data = {
      orderImageUser: {
        images: req?.file?.filename,
        admin: req?.body?.orderImageUser?.admin,
      },
    }
  }
  try {
    const feedbackAdmin = await Order.findByIdAndUpdate(
      {
        _id: req?.params?.id,
      },
      data,
      { new: true }
    )
    await feedbackAdmin.save()
    await mail(
      process.env.NODE_APP_MAILGUN_MAIL_SENDING,

      "Service Information",
      ``,
      true,
      {
        name: feedbackAdmin.cardHolder,
        serviceName: feedbackAdmin.serviceDetails?.name,
        id: feedbackAdmin._id,
      },
      6
    )
    return res.json({
      status: HTTP_STATUS_CODE.OK,
      data: feedbackAdmin,
      success: true,
    })
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: err.message ? err.message : err })
  }
}

module.exports = {
  createCheckoutPayment,
  getAllOrders,
  getSingleOrder,
  getAllOrdersUsers,
  adminFeedback,
  updateSingleOrder,
  userFeedback,
}
