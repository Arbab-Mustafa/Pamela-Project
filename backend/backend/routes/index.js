const router = require("express").Router()

router.use("/user", require("./users"))
router.use("/auth", require("./auth"))
router.use("/company", require("./company"))
router.use("/services", require("./service"))
router.use("/payment", require("./stripe"))

module.exports = router
