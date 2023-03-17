const express = require("express");
const uploadFileController = require("../controllers/uploadFileController");

const router = express.Router();

router.get("/buckets", uploadFileController.getBucketsV3);
router.post(
  "/upload",
  uploadFileController.upload.single("file"),
  uploadFileController.uploadFileV3
);
module.exports = router;
