const multer = require("multer")
const { HTTP_STATUS_CODE } = require("../config/constants")

const notFound = (req, res, next) => {
  const err = new Error(`page not found ${req.originalUrl}`)
  res.status(404)
  next(err)
}

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
    status: statusCode,
  })
}

const multerErrorHandling = (err, req, res, next) => {
  if (!err) {
    return next()
  }
  if (err instanceof multer.MulterError) {
    res
      .status(HTTP_STATUS_CODE.BAD_REQUEST)
      .send({ message: "Something went wrong" })
  } else {
    res
      .status(HTTP_STATUS_CODE.INTERNAL_SERVER)
      .send({ message: "Internal server error" })
  }
}

module.exports = {
  notFound,
  errorHandler,
  multerErrorHandling,
}
