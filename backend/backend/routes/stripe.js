const router = require("express").Router()
const stripeControllers = require("../controllers/stripe")
const auth = require("../middlewares/auth")
const { multerErrorHandling } = require("../middlewares/errorHandling")
const upload = require("../middlewares/multer")
const { adminRules } = require("../middlewares/validations")

router.post("/checkout-cart", [auth], stripeControllers.createCheckoutPayment)
router.post(
  "/get-all-orders",
  [auth, adminRules],
  stripeControllers.getAllOrders
)
router.post(
  "/get-all-orders-users",
  [auth],
  stripeControllers.getAllOrdersUsers
)

router.post("/order/:id", [auth, adminRules], stripeControllers.getSingleOrder)
router.post(
  "/order-update-details/:id",
  [auth, adminRules],
  stripeControllers.updateSingleOrder
)

router.post(
  "/order-update/:id",
  [auth, multerErrorHandling, upload.single("file")],
  stripeControllers.adminFeedback
)

router.post(
  "/order-update-user-data/:id",
  [auth, multerErrorHandling, upload.single("file")],
  stripeControllers.userFeedback
)

module.exports = router
