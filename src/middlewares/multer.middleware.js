import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (rew, file, co) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
})