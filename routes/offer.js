// imports packages
const express = require("express");
const router = express.Router();
const lodash = require("lodash");
// import middleware
const isTokenValid = require("../middleware/isTokenValid");
const isAdministrator = require("../middleware/isAdministrator");

// import utility functions
const isEmpty = require("../utility/isEmpty");
const modelKeys = require("../utility/modelKeys");

// import resources

// declare global variables

// import models
//const User = require("../models/User");
const Offer = require("../models/Offer");
//const Log = require("../models/Log");

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
    console.log(req.user._id);
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
router.get("/offer/all-with-count", isTokenValid, async (req, res) => {
  try {
    // import and put in new variables
    // console.log(req.fields);
    //console.log(req.query);

    // make query with query parameters limited to title, description, userId
    // build keys of model Offer with only the parameters to filter
    const filterKeys = modelKeys(Offer, ["__v"]);
    //console.log(filterKeys);
    // build the filter
    let filter = {};
    filterKeys.forEach(element => {
      if (req.query[element]) {
        filter[element] = req.query[element];
      }
    });

    // if user is not administrator then filter for only her offers if administrator filter for set userId or by default all
    if (req.user.role === "administrator") {
      if (req.query.userId) {
        filter.userId = req.query.userId;
      }
    } else {
      filter.userId = req.user._id;
    }

    // filtered by price with priceMin and priceMax
    const priceMin = req.query.priceMin;
    const priceMax = req.query.priceMax;
    filter.price = { $gte: priceMin, $lt: priceMax };

    // build the skip and limit
    let skip = Number(req.query.skip),
      limit = Number(req.query.limit);
    // console.log("skip", skip);
    // console.log("limit", limit);
    if (isNaN(skip)) {
      skip = 0;
    } // by default skip = 0
    if (isNaN(limit)) {
      limit = 25;
    } // by default limit = 25
    // console.log("skip", skip);
    // console.log("limit", limit);

    // set the sortFlag
    let sortFlag = {};
    const sort = req.query.sort;
    switch (sort) {
      case "date-asc":
        sortFlag = { created: 0 };
        break;
      case "date-dsc":
        sortFlag = { created: -1 };
        break;
      case "price-asc":
        sortFlag = { price: 0 };
        break;
      case "price-dsc":
        sortFlag = { price: -1 };
        break;
    }

    let offers = await Offer.find(filter, null, { skip, limit }).sort(sortFlag);
    // console.log(offers);

    // request for all offers with filter
    // let offers = await Offer.find(filter);
    // console.log(offers);

    res.status(200).json({
      message: `Please find the list of offers and with number of offers.`,
      data: { count: offers.length, offers }
    });
  } catch (error) {
    console.log("error.message", error.message);
    res.json(error.message);
  }
});

// export
module.exports = router;
