import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
        //mongoose gives you a returned object
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)//connectionInstance.connection.host, done because what is I connect to a different server which is not related to production
    } catch (error) {
        console.error("MONGODB connection error", error)//you can throw the error, but will be using a built in process keyword to exit the process
        process.exit(1)
    }
}

export default connectDB //default because there is nothing more in this file