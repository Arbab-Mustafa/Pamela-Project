const router = require("express").Router()
const serviceController = require("../controllers/service")

router.post("/all", serviceController.get)
router.post("/state-all", serviceController.getState)
router.post("/single-service/:id", serviceController.getSingleService)

module.exports = router
