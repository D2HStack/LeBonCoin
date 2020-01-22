// test if token is valid

// imports packages
const express = require("express");
// const router = express.Router();

// import middleware

// import utility functions

// import resources

// declare global variables

// import models
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // don't forget next in the callback
    // read token in the authorization header
    const token = req.headers.authorization.replace("Bearer ", ""); // need to remove Bearer at the beginning of the result
    //console.log(token);

    // find user with the token in the header
    const user = await User.findOne({ token });
    //console.log(user);
    if (!user) {
      res.status(400).json({ message: "Please log in before posting offer." });
    } else {
      req.user = user;
      next();
    }
  } catch (error) {
    console.log("error.message", error.message);
    res.json(error.message);
  }
};
