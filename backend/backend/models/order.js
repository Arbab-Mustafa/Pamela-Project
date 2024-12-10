const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      // required: true,
    },
    orderDetails: {
      type: [Object],
      required: true,
    },
    serviceDetails: {
      type: Object,
    },
    orderName: {
      type: String,
    },
    cardHolder: {
      type: String,
    },

    status: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    address: {
      type: Object,
      required: true,
    },
    orderStatusAdmin: {
      title: { type: String },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    orderMessageAdmin: {
      title: { type: String },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    orderImageAdmin: {
      images: {
        type: String,
      },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    orderImageUser: {
      images: {
        type: String,
      },
      admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    deleteFile: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Order", serviceSchema)
