const mongoose = require("mongoose")

const serviceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    oneDayFees: {
      type: Number,
    },
    towDayFees: {
      type: Number,
    },
    standardFees: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Service", serviceSchema)
