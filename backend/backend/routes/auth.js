const router = require("express").Router()
const authController = require("../controllers/auth")
const auth = require("../middlewares/auth")
const userController = require("../controllers/users")
const joiValidator = require("../middlewares/joi")
const validation = require("../middlewares/validations")

const {
  loginValidator,
  changePasswordValidator,
} = require("../middlewares/joi")

router.post("/login", [loginValidator], authController.login)
router.post("/refresh", [auth], authController.refreshToken)
router.post(
  "/register",
  [validation.adminCondition, joiValidator.registerValidator],
  userController.createUser
)
router.post(
  "/change-password",
  [changePasswordValidator, auth],
  authController.changePassword
)

module.exports = router
