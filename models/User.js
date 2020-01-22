// import packages
const mongoose = require("mongoose");

// import resources

// create model
const User = mongoose.model("User", {
  email: { type: String },
  username: { type: String },
  phone: { type: String },
  token: { type: String },
  salt: { type: String },
  hash: { type: String },
  role: { type: String }
});

// export
module.exports = User;
