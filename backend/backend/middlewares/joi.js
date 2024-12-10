const Joi = require("joi")
const { HTTP_STATUS_CODE } = require("../config/constants")

const registerValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/m
      )
      .message(
        "use 1 Capital 1 Uppercase and 1 Special character length min 8 to 30"
      ),
    phone: Joi.string().required(),
  })
  const { error } = schema.validate(req.body)
  const valid = error == null

  if (valid) {
    next()
  } else {
    const { details } = error
    const message = details.map((i) => i.message).join(",")
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message })
  }
}
const loginValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  })
  const { error } = schema.validate(req.body)
  const valid = error == null

  if (valid) {
    next()
  } else {
    const { details } = error
    const message = details.map((i) => i.message).join(",")
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message })
  }
}

const changePasswordValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    oldPassword: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/m
      )
      .message(
        "use 1 Capital 1 Uppercase and 1 Special character length min 8 to 30"
      ),
    newPassword: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/m
      )
      .message(
        "use 1 Capital 1 Uppercase and 1 Special character length min 8 to 30"
      ),
  })
  const { error } = schema.validate(req.body, { allowUnknown: true })
  const valid = error == null

  if (valid) {
    next()
  } else {
    const { details } = error
    const message = details.map((i) => i.message).join(",")
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message })
  }
}

const passwordValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    newPassword: Joi.string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/m
      )
      .message(
        "use 1 Capital 1 Uppercase and 1 Special character length min 8 to 30"
      ),
  })
  const { error } = schema.validate(req.body, { allowUnknown: true })
  const valid = error == null

  if (valid) {
    next()
  } else {
    const { details } = error
    const message = details.map((i) => i.message).join(",")
    res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message })
  }
}

module.exports = {
  loginValidator,
  registerValidator,
  changePasswordValidator,
  passwordValidator,
}
