const express = require ("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req,file,cb){ 
        cb(null,path.join(__dirname,"../images")); // path of images
    },
    filename: function (req,file,cb){
        cb(null, new Date().toISOString().replace(/:/g, "-")/* regular expression*/+ file.originalname); // new name
    }
})

const upload = multer({ storage })


// /api/upload
router.post("/", upload.single("image"), (req,res) => {
    res.status(200).json({message: "image Uploaded"});
})

module.exports = router;