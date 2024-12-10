const nodemailer = require("nodemailer")
const ejs = require("ejs")
const fs = require("fs")
const path = require("path")
const cron = require("node-cron")

// const Users = require("../models/user")

module.exports = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  })
  const users = [
    { name: "talha1", email: "talhakhanabbasi@gmail.com" },
    { name: "talha2", email: "talhakhanabbasi@gmail.com" },
  ]
  const template = fs.readFileSync(
    path.resolve("./backend/view/sendMailToAllUsers.ejs"),
    "utf8"
  )
  const compiledTemplate = ejs.compile(template)

  // Define the email options

  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    subject: "Filthy Formation TEST Working",
    html: "",
  }

  // Define the cron job to run every day at 8:00 AM
  cron.schedule("* * * * *", () => {
    // Loop through each user and send the email
    users.forEach((user) => {
      // Render the template with user data
      const html = compiledTemplate({ name: user.name })

      // Update the mail options with user data and rendered template
      mailOptions.to = user.email
      mailOptions.html = html

      // Send the email
      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          // console.log(error)
        } else {
          // console.log("Email sent: " + info.response)
        }
      })
    })
  })
}
