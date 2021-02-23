const router = require('express').Router();

const upload = require("../middleware/upload");
const imageController = require('../controllers/imageControllers')



router.get("/image", imageController.getImage);
router.post("/upload", upload.single("image"), imageController.imageUpload);

module.exports = router