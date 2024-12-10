const path = require("path")
const multer = require("multer")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./backend/public/assets/upload"))
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    )
  },
})

const upload = multer({ storage: storage })

module.exports = upload
