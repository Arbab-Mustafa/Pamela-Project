const mongoose = require("mongoose")

const adminDocs = mongoose.Schema(
  {
    images: {
      type: [{ data: Buffer, contentType: String, name: String }],
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("AdminDocs", adminDocs)
