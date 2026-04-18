import multer from "multer"


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads")
        console.log(file)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

export const upload = multer({
    storage,

})