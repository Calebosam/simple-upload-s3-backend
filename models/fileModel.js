const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A file must have a name"],
  },
  url: {
    type: String,
    required: [true, "A file must have an url"],
  },
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
