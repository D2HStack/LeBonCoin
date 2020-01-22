// import packages
const mongoose = require("mongoose");

// import resources

// create model
const Log = mongoose.model("Log", {
  type: String,
  transaction: Object,
  date: Date
});

// export
module.exports = Log;
