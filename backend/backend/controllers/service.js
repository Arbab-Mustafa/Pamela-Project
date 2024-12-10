const { HTTP_STATUS_CODE } = require("../config/constants")
const State = require("../models/state")
const Service = require("../models/service")

const get = async (req, res) => {
  try {
    const request = await Service.find({}).sort({ title: 1 })
    res.status(200).json({
      success: true,
      status: HTTP_STATUS_CODE.OK,
      data: request,
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}
const getSingleService = async (req, res) => {
  try {
    const request = await Service.findById(req.params.id)
    res.status(200).json({
      success: true,
      status: HTTP_STATUS_CODE.OK,
      data: request,
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}
const getState = async (req, res) => {
  try {
    const request = await State.find({}).sort({ name: 1 })
    res.status(200).json({
      success: true,
      status: HTTP_STATUS_CODE.OK,
      data: request,
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}
module.exports = {
  get,
  getState,
  getSingleService,
}
