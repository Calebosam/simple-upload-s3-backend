const express = require("express");
const uploadFileController = require("../controllers/uploadFileController");

const router = express.Router();

router.get("/buckets", uploadFileController.getBuckets);
router.post(
  "/upload",
  uploadFileController.upload.single("file"),
  uploadFileController.uploadFile
);
module.exports = router;
