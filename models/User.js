// import packages
const mongoose = require("mongoose");

// import resources

// create model
const User = mongoose.model("User", {
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  salt: { type: String, required: true, unique: true },
  hash: { type: String, required: true, unique: true },
  role: { type: String, required: true }
});

// export
module.exports = User;
