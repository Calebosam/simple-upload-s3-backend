const multer = require("multer");
const AwsClient = require("../utils/awsClient");
const AWS3 = require("@aws-sdk/client-s3");
const File = require("../models/fileModel");

exports.upload = multer({});

exports.getBuckets = (req, res, next) => {
  const s3 = new AwsClient.AWS.S3({});
  s3.listBuckets((err, data) => {
    if (err) console.log(err);
    res.json({ status: "success", buckets: data.Buckets });
  });
};

exports.uploadFile = (req, res, next) => {
  try {
    const s3 = new AwsClient.AWS.S3({});
    const fileName = `${Date.now()}-${req.file.originalname}`;
    let uploadParams = {
      Key: "documents/" + fileName,
      Bucket: "caleb-testing-upload",
      Body: req.file.buffer,
    };
    s3.upload(uploadParams, async (err, response) => {
      if (err) console.log(err);
      console.log(response);
      const file = await File.create({
        name: fileName,
        url: response.Location,
      });
      res.json({ status: "success", file });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getBucketsV3 = async (req, res, next) => {
  try {
    const command = new AWS3.ListBucketsCommand({});
    const response = await AwsClient.s3Instance.send(command);
    res.send(response.Buckets);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.uploadFileV3 = async (req, res, next) => {
  try {
    const fileName = `documents/${Date.now()}-${req.file.originalname}`;
    let uploadParams = {
      Key: fileName,
      Bucket: "caleb-testing-upload",
      Body: req.file.buffer,
    };
    const command = new AWS3.PutObjectCommand(uploadParams);
    const response = await AwsClient.s3Instance.send(command);
    if (response.$metadata.httpStatusCode === 200) res.send("success");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
