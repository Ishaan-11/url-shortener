const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

const saltRounds = 10;

// @route     GET /register
// @desc      Render Register view
router.get("/", function(req, res) {
  res.render("register");
});

// @route     POST /register
// @desc      Register user
router.post("/", function(req, res) {
  try {
    const { username: email, password } = req.body;

    if (email && password) {
      User.findOne({ email: email }, function (err, foundUser) {
        if(foundUser) {
          res.status(409).json("User already exist!");
        } else {
          bcrypt.hash(password, saltRounds, function(err, hash) {
            const newUser = new User({
              email,
              password: hash
            });
            
            newUser.save(function (err) {
              if (err) {
                res.status(500).json("User cannot be saved!");
              } else {
                res.render("url/show");
              }
            });
          });
        }
      });
    } else {
      res.status(422).json("Invalid Input");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Register: Server error');
  }
});

module.exports = router;