import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//watch history
const watchHistorySchema = mongoose.Schema({
    videos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video"
    }
})

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,//cloudinary url , like aws
        required: true,
    },
    coverImage: {
        type: String,//cloudinary url , like aws
    },
    watchHistory: [
        watchHistorySchema
    ],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String,
    }
}, { timestamps: true })

//encryption process, few notes below in "read"
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next() // this next() will terminate the process if the criteria is met

    this.password = await bcrypt.hash(this.password, 10) //second parm on hash is rounds, in algorithm
    next()
})

//check if the password correct,
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Generate Access token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        //payload
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//Generate Refresh token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        //payload
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)

/*
    read
    - encryption process 
    >>
    userSchema.pre("save",async function(next){

    })

    here, encryption in a complex process, takes time, cpu processing, so we
    using a async function, also in a middleware we require to have an excess to "next",
    so when the function reaches completion, at the end we have to call the next, telling
    to pass the flag forward
*/