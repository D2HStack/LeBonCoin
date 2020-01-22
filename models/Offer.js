// import packages
const mongoose = require("mongoose");

// import resources

// create model
const Offer = mongoose.model("Offer", {
  title: String,
  description: String,
  price: Number,
  created: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

// export
module.exports = Offer;
