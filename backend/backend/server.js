const http = require("http")
const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const morgan = require("morgan")
const conectdb = require("./database/db")
// const sendMailToAll = require("./nodemailer/cornJob")
const port = process.env.PORT || 4000
const app = express()
const { notFound, errorHandler } = require("./middlewares/errorHandling")

app.use(cors({ origin: "*" }))
app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan("dev"))

conectdb()

const server = http.createServer(app)

app.get("/", (req, res) => {
  res.send("Welcome to mongoose")
})
// sendMailToAll()
app.use("/api/v1/", require("./routes/index"))

app.use(notFound)
app.use(errorHandler)
server.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Server is running on port ${port}`)
  }
})

module.exports = app
