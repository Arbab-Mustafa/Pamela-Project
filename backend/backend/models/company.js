const mongoose = require("mongoose")

const companySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyName: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    stateService: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    entityType: {
      type: String,
      // required: true,
    },
    stateFormation: {
      type: String,
      // required: true,
    },
    postal_code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Company", companySchema)
