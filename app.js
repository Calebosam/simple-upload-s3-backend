const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const uploadFileRouter = require("./routers/uploadFileRouter");
const uploadFileRouterV3 = require("./routers/uploadFileRouterV3");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

app.get("/", (req, res, next) => {
  res.send("<h1>Hello world</h1>");
});

app.use("/api/v2/aws", uploadFileRouter);
app.use("/api/v3/aws", uploadFileRouterV3);

//Error Handler
app.use((err, req, res, next) => {
  if (err) {
    if (process.env.NODE_ENV === "production") {
      res.status(400).json({ status: "fail", message: "Bad request" });
    } else {
      console.log(err);
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack,
      });
    }
  }
});

module.exports = app;
