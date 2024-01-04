// require('dotenv').config({ path: './env' });
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import { app } from "./app.js"

dotenv.config({
    path: './env',
});
/*
-r dotenv/config --experimental-json-modules, add this to package.json dev property
*/

/*
Second approach, better one, another file from db folder, connect db in that file,
export that file and import in index.js file
*/

connectDB()
    .then(() => {
        //listen to server start after db connection
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running in port: ${process.env.PORT}`)
        }) //default port 8000
    })
    .catch((err) => {
        console.log("Mongo DB connection failed !!!", err)
    })



















//First approach to connect the db within the index.js
/*
const connectDB = () => {
 
}
connectDB();
 
    - we can make this code better by using IIFE
    - An IIFE (Immediately Invoked Function Expression) is a function 
    that runs the moment it is invoked or called in the JavaScript event loop
*/

/*
import express from "express";

const app = express();

//good approach: connecting db in a module/in IIFE/Not polluting anything outside
; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //DB connect, we also have to add / and db name, use constants.js that we created
        //when db is connected, what you see next is listeners
        app.on("error", (error) => {
            console.log("ERROR: ", error)
            throw err
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw err //you can throw error or process exit
    }
})() //professional approach to add a semicolon at the beginning
*/

