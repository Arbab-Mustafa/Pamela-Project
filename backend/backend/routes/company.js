const router = require("express").Router()
const companyController = require("../controllers/company")
const auth = require("../middlewares/auth")

router.post("/all", [auth], companyController.getCompanies)
router.post("/create", [auth], companyController.createCompany)
router.post("/my-company", [auth], companyController.getMyCompany)
router.post("/update", [auth], companyController.updateCompany)
router.post("/:id", [auth], companyController.singleCompany)

module.exports = router
