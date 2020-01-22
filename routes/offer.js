// imports packages
const express = require("express");
const router = express.Router();
// import middleware
const isTokenValid = require("../middleware/isTokenValid");
const isAdministrator = require("../middleware/isAdministrator");

// import utility functions
const isEmpty = require("../utility/isEmpty");

// import resources

// declare global variables

// import models
const User = require("../models/User");
const Offer = require("../models/Offer");
const Log = require("../models/Log");

// create routes
// route: publish an offer
router.post("/offer/publish", isTokenValid, async (req, res) => {
  try {
    // import and put in new variables
    //console.log(req.fields);

    // test if request is empty or keys in keysTest are empty
    const keysTest = ["title", "description", "price"];
    const IsEmptyFields = isEmpty(req.fields, keysTest);
    //console.log(IsEmptyFields);
    if (IsEmptyFields.empty || IsEmptyFields.keys.length > 0) {
      res.status(400).json({
        message: "Please fill in the empty fields."
      });
    }

    const newOffer = new Offer({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price,
      created: new Date(),
      userId: req.user._id
    });
    await newOffer.save();
    console.log(newOffer);
    res
      .status(200)
      .json({ message: "Your offer has been successfully published." });
  } catch (error) {
    console.log("error.message", error.message);
    res.json(error.message);
  }
});

// route: list all offer with total number of offers
router.get("/offer/all-with-count", isAdministrator, async (req, res) => {
  try {
    // import and put in new variables
    //console.log(req.fields);
    // test if request is empty or keys in keysTest are empty

    const offers = await Offer.find().populate("userId");
    //console.log(offers);
    res.status(200).json({
      message:
        "Please find the list of all offers and with total number of offers.",
      data: { count: offers.length, offers }
    });
  } catch (error) {
    console.log("error.message", error.message);
    res.json(error.message);
  }
});

// export
module.exports = router;
