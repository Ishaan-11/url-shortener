const e = require("express");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// @route     GET /login
// @desc      Render Login view
router.get("/", function(req, res) {
  res.render("login");
});


// @route     POST /login
// @desc      Login user
router.post("/",function(req, res) {
  try {
    const { username: email, password } = req.body;

    if (email && password) {
      User.findOne({email: email}, function(err, foundUser) {
        if (err) {
          res.status(500).json("User cannot be fetched!");
        } else {
          if (foundUser) {
            bcrypt.compare(password, foundUser.password, function(err, result) {
              if(result === true) {
                res.render("url/show");
              } else {
                res.status(422).json("Wrong password!");
              }
            });
          } else {
            res.status(404).json("User does not exits");
          }
        }
      });
    } else {
      res.status(422).json("Invalid Input");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Login: Server error');
  }
});



module.exports = router;