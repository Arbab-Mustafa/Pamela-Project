// const User = require("../models/user")
// const Order = require("../models/order")
// const bcrypt = require("bcryptjs")
// const Service = require("../models/service")
// const { fakeData, headerService } = require("../config/fakeData")

// const connectDb = require("../database/db")
// require("dotenv").config()
// connectDb()

// const importUser = async () => {
// try {
//     await Service.deleteMany({})
//     // await Order.deleteMany({})

//     // const data = fakeData.map(async (e) => {
//     //   const genSalt = await bcrypt?.genSalt(10)
//     //   const hashPassword = await bcrypt?.hash(e.password, genSalt)
//     //   e.password = hashPassword
//     //   const admin = e.isAdmin ? { ...e?.adminRoleType, _id: e?._id } : null
//     //   await User.create({ ...e, adminRoleType: admin })
//     // })
//     // return data

//     // console.log(data)
//     await Service.insertMany(headerService, { ordered: false })
//     console.log("Done")
//     // process.exit(0)
//   } catch (e) {
//     console.log(e)
//     process.exit(1)
//   }
// }

// const deleteUser = async () => {
//   // await Company.deleteMany({})
//   await Order.deleteMany({})
//   process.exit()
// }

// if (process.argv[2] === "-i") {
//   importUser()
// } else if (process.argv[2] === "-d") {
//   deleteUser()
// }
// module.exports = {
//   importUser,
//   deleteUser,
// }
