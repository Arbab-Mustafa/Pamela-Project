// const nodemailer = require("nodemailer")
const mailgun = require("mailgun-js")
const ejs = require("ejs")
const fs = require("fs")
const path = require("path")

const mg = mailgun({
  apiKey: process.env.NODE_APP_MAILGUN_API_KEY,
  domain: process.env.NODE_APP_MAILGUN_DOMAIN,
})
// console.log(mg)

module.exports = async (
  email,
  subject,
  message,
  ejsTemplate = false,
  data,
  templateNo = 1
) => {
  try {
    const SignupTemplate = "./backend/view/signUp.ejs"
    const ResetTemplate = "./backend/view/forgetPassword.ejs"
    const PurchaseDoneTemplateUser = "./backend/view/purchaseDone.ejs"
    const PurchaseDoneTemplateAdmin = "./backend/view/purchaseDoneAdmin.ejs"

    const AdminFeedback = "./backend/view/adminFeedBack.ejs"
    const UserFeedBack = "./backend/view/userFeedBack.ejs"

    const templateOnCondition =
      templateNo === 1
        ? SignupTemplate
        : templateNo === 2
        ? ResetTemplate
        : templateNo === 3
        ? PurchaseDoneTemplateUser
        : templateNo === 4
        ? PurchaseDoneTemplateAdmin
        : templateNo === 5
        ? UserFeedBack
        : templateNo === 6
        ? AdminFeedback
        : null

    const template = fs.readFileSync(path.resolve(templateOnCondition), "utf8")
    const compiledTemplate = ejs.compile(template)

    const emailParams = {
      from: process.env.NODE_APP_MAILGUN_MAIL_SENDING,
      to: email,
      subject: subject,
      html: `${ejsTemplate ? compiledTemplate({ data }) : message}`,
    }

    mg.messages().send(emailParams, (error) => {
      if (error) {
        // console.error("Error sending email:", error)
      } else {
        // console.log("Email sent successfully:")
      }
    })
  } catch (err) {
    // console.log(err)
    return err
  }
}
