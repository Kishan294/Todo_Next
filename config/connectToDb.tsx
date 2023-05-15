import mongoose from "mongoose"

const url = process.env.MONGODB_URI!.toString()

let isConnected = false

const connectToDb = async () => {
  try {
    await mongoose.connect(url, { dbName: "todo_data" })
    console.log("Connected")
    isConnected = true
  } catch (error) {
    console.log(error)
  }

  if (isConnected) console.log("Already connected")
}

export default connectToDb
