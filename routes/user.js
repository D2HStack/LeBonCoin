// imports packages
const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const isEmpty = require("../utility/isEmpty");

// import middleware

// import utility functions
const isEmpty = require("../utility/isEmpty");

// import resources

// declare global variables

// import models
const User = require("../models/User");
const Log = require("../models/Log");

// create routes
// route: sign up a user
router.post("/user/sign_up", async (req, res) => {
  try {
    // import and put in new variables
    //console.log(req.fields);
    // test if request is empty or keys in keysTest are empty
    const keysTest = [
      "email",
      "username",
      "phone",
      "password",
      "confirmedPassword"
    ];
    const IsEmptyFields = isEmpty(req.fields, keysTest);
    //console.log(IsEmptyFields);
    if (IsEmptyFields.empty || IsEmptyFields.keys.length > 0) {
      res.status(400).json({
        message: "Please fill in the empty fields."
      });
    }
    if (req.fields.password !== req.fields.confirmedPassword) {
      res.status(400).json({
        message: "Please fill in the same password."
      });
    } else {
      const userTestEmail = await User.findOne({ email: req.fields.email });
      //console.log(userTestEmail);
      const userTestPhone = await User.findOne({ phone: req.fields.phone });
      //console.log(userTestPhone);
      if (userTestEmail || userTestPhone) {
        res.status(400).json({
          message: "The email address or phone number is already used."
        });
      } else {
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.fields.password + salt).toString(encBase64);
        const user = new User({
          email: req.fields.email,
          token,
          salt,
          hash,
          username: req.fields.username,
          phone: req.fields.phone
        });
        //console.log(user);
        await user.save();
        res.json({ message: "Welcome! You have been successfully signed up." });
      }
    }
  } catch (error) {
    console.log("error.message", error.message);
    res.json(error.message);
  }
});

// route: log in a user
router.post("/user/log_in", async (req, res) => {
  try {
    // import and put in new variables
    // console.log(req.fields);
    // test if request is empty or keys in keysTest are empty
    const keysTest = ["email", "password"];
    const IsEmptyFields = isEmpty(req.fields, keysTest);
    //console.log(IsEmptyFields);
    if (IsEmptyFields.empty || IsEmptyFields.keys.length > 0) {
      res.status(400).json({
        message: "Please fill in your email address and your password."
      });
    } else {
      const userToLogIn = await User.findOne({ email: req.fields.email });
      //console.log(userToLogIn);
      if (!userToLogIn) {
        res
          .status(400)
          .json({ message: "Either email address or password is incorrect" });
      } else {
        const hashToTest = SHA256(
          req.fields.password + userToLogIn.salt
        ).toString(encBase64);
        if (hashToTest === userToLogIn.hash) {
          res.status(200).json({
            _id: userToLogIn._id,
            token: userToLogIn.token,
            account: {
              username: userToLogIn.username,
              phone: userToLogIn.phone
            }
          });
        } else {
          res
            .status(400)
            .json({ message: "Either email address or password is incorrect" });
        }
      }
    }
  } catch (error) {
    console.log("error.message", error.message);
    res.json(error.message);
  }
});

// export
module.exports = router;
