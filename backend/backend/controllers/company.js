const { HTTP_STATUS_CODE } = require("../config/constants")
const Company = require("../models/company")
const User = require("../models/user")

const createCompany = async (req, res) => {
  try {
    let response
    const findCompany = await Company.findOne({ userId: req.user })
    if (findCompany) {
      response = await Company.findOneAndUpdate(
        { userId: req.user },
        { ...req.body },
        {
          new: true,
        }
      )
      await response.save()
    }
    if (!findCompany) {
      response = await Company.create({ ...req.body, userId: req.user })
    }
    const responseUser = await User.findOneAndUpdate(
      { _id: req.user },
      { companyOwned: response.id },
      {
        new: true,
      }
    )
    await responseUser.save()
    await response.save()
    return res.status(HTTP_STATUS_CODE.CREATED).json({
      message: "Successfully Company created",
      success: true,
      data: response,
      status: HTTP_STATUS_CODE.CREATED,
    })
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
      status: err.status,
    })
  }
}
const getCompanies = async (req, res) => {
  try {
    const request = await Company.find({})
    res.status(HTTP_STATUS_CODE.OK).json({
      message: "Successfully Company fetched",
      success: true,
      status: HTTP_STATUS_CODE.OK,
      data: request,
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

const singleCompany = async (req, res) => {
  try {
    const { id } = req.params
    const singleCompanyRequest = await Company.findById(id)
    if (!singleCompanyRequest) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("User not found")
    }
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Successfully Company fetched",
      status: HTTP_STATUS_CODE.OK,
      success: true,
      data: singleCompanyRequest,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}

const getMyCompany = async (req, res) => {
  try {
    const getSingleCompany = await Company.findOne({ userId: req?.user })

    if (!getSingleCompany) {
      res.status(HTTP_STATUS_CODE.NOT_FOUND)
      throw new Error("Company Not found")
    }
    return res.status(HTTP_STATUS_CODE.OK).json({
      message: "Successfully Company fetched",
      status: HTTP_STATUS_CODE.OK,
      success: true,
      data: getSingleCompany,
    })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
}
const updateCompany = async (req, res) => {
  try {
    const findCompany = await Company.findOneAndUpdate(
      { userId: req.user },
      { ...req.body },
      {
        new: true,
      }
    )
    if (!findCompany) {
      res.status(404)
      throw new Error("Email already Exists!")
    }
    return res.status(201).json({
      message: "Successfully Company Updated",
      status: HTTP_STATUS_CODE.OK,
      data: findCompany,
      success: true,
    })
  } catch (err) {
    return res.json({ success: false, message: err.message })
  }
}

module.exports = {
  createCompany,
  getCompanies,
  singleCompany,
  getMyCompany,
  updateCompany,
}
