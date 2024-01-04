import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// app.get('/', (req, res) => {
//     res.send("Server connected successfully");
// })

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true, //allowing credentials
})) //.use() is used for middlewares, configurations

//data comes from various places in backend, url, json data, request body form,

//configurations
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" })) //params can be hitesh+chaudary or hitesh%20chaudary in url, so to prevent that
app.use(express.static("public"))
app.use(cookieParser())

export { app } // you can also write export default app


/*
    doc on data configurations
    - express.urlencoded(), what is it
    - extended, you can put object inside objects, nested objects
    - express.static() , when we want to store files, folders, pdf, images in own server,
    make a public assets

    why to use cookie parser?
    - to be able to access user's browsers cookie or set cookies, to be able to perform
    crud operations on their cookies, there are ways to put secure cookies in user's browsers,
    that cookies can only be accessed and removed by the server 
*/