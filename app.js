const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const bodyParser = require("body-parser")


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(logger("dev"))

app.get("/", (req, res, next)=>{
    res.send("<h1>Hello world</h1>")
})
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
  

module.exports = app