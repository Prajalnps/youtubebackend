import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

//organize, make a method, pass in the path of the local file as parameter, after success full upload, file unlink
const uploadOnCloudinary = async (localFilePath) => {
    //this process is a troubling one, so use try catch
    try {
        if (!localFilePath) return null
        //upload the file in cloudinary, it will take time so add await
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //file has been uploaded successfully
        console.log("File is uploaded in Cloudinary", response.url)

        return response
    } catch (error) {
        //safe cleaning, remove the locally saved file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        return null
    }
}

export { uploadOnCloudinary }
/*
    Read
    - goal- file will come through file systems, meaning it has already
    been uploaded to the server, but this will use a server that will give 
    us the path of a local file, what ever file that has been uploaded to the server
*/