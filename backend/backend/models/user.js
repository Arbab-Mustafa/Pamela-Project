const mongoose = require("mongoose")
const company = require("./company")
const Order = require("./order")

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userAddress: {
      type: Object,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    adminRoleType: {
      type: { name: String, _id: String },
    },
    phone: {
      type: String,
      required: true,
    },
    companyOwned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    serviceOwned: {
      type: Boolean,
      default: false,
    },
    stripeId: {
      type: String,
    },
    forgetToken: {
      type: String,
    },
    serviceDetails: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Service",
    },
    orderDetails: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Order",
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("findOneAndRemove", async function (next) {
  const doc = this
  await Order.deleteMany({ userId: doc?._conditions?._id })
  await company.deleteMany({ userId: doc?._conditions?._id })
  next()
})
// userSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
//   const doc = this
//   doc._update.role.key = doc?._conditions?.id
//   next()
// })

module.exports = mongoose.model("User", userSchema)
