// import packages
const mongoose = require("mongoose");

// import resources

// create model
const User = mongoose.model("User", {
  email: { type: String, unique: true },
  username: String,
  phone: { type: String, unique: true },
  token: String,
  salt: String,
  hash: String
});

// export
module.exports = User;
