const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    // Enable strict query behavior
    mongoose.set("strictQuery", true)

    // Establish the MongoDB connection
    const connection = await mongoose.connect(process.env.MONGO_DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDb Connected${connection.connection.host}`)
  } catch (e) {
    console.error(`Error: ${e.message}`)
    process.exit(1) // Exit process with failure
  }
}

module.exports = connectDb
