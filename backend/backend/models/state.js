const mongoose = require("mongoose")

const stateSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    priceData: {
      type: [Object],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("State", stateSchema)
