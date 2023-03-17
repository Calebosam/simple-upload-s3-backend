const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const AWS3 = require("@aws-sdk/client-s3");
dotenv.config();

AWS.config.update({
  region: "us-west-1",
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

const s3Instance = new AWS3.S3Client({
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
  region: "us-west-1",
});

module.exports = { AWS, s3Instance };
