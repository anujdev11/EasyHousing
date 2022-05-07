// Author: Pankti Vyas (B00886309)

const express = require("express");
const multer = require("multer");
const path = require("path");

const { getAllServices, getMyServices, filterServices } = require("../controllers/serviceController");
const { addService } = require("../controllers/serviceController");
const { editService } = require("../controllers/serviceController");
const { getService } = require("../controllers/serviceController");
const { deleteService } = require("../controllers/serviceController");

const router = express.Router();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images/"),
  filename: (req, file, cb) => {
    const imageName = Date.now() + path.extname(file.originalname);
    req.body.image = imageName;
    cb(null, imageName);
  }
});

const upload = multer({ storage: fileStorage });


router.get("/", getAllServices);
router.get("/:id",getService);
router.post("/", upload.single("image"), addService);
router.put("/:id", upload.single("image"), editService);
router.delete("/:id", deleteService);
router.get("/myservices/:id", getMyServices);
router.post("/filter", filterServices);


module.exports = router;
