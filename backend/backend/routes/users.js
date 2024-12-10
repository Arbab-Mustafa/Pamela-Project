const router = require("express").Router()
const userController = require("../controllers/users")
const auth = require("../middlewares/auth")
const joiValidator = require("../middlewares/joi")
const validation = require("../middlewares/validations")

router.post("/all", [auth, validation.adminRules], userController.get)
router.post(
  "/create",
  [validation.adminCondition, joiValidator.registerValidator],
  userController.createUser
)
router.post("/forget-password", userController.forgetPassword)
router.post(
  "/reset-password",
  [joiValidator.passwordValidator],
  userController.resetPassword
)
router.post("/verify-password-token", userController.verifyToken)
router.post(
  "/single-user/:id",
  [auth, validation.adminRules],
  userController.singleUser
)
router.post("/token-check", [auth], userController.checkToken)
router.delete(
  "/delete-user/:id",
  [auth, validation.adminRules],
  userController.deleteUser
)
router.post("/update-user/:id", [auth], userController.updateUser)
router.post("/add-admin", [auth], userController?.makeAdmin)
router?.post("/remove-admin", [auth], userController?.removeAdmin)

module.exports = router
