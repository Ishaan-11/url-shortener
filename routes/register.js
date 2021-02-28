const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require('passport');


// @route     GET /register
// @desc      Render Register view
router.get("/", function(req, res) {
  res.render("register");
});

// @route     POST /register
// @desc      Register user
router.post("/", function(req, res) {
  try {
    const { username, password } = req.body;

    if (username && password) {
      let role = "other";
      if(username === "ishaansharma1998@gmail.com") {
        role = "admin";
      }
      
      User.register({username: username, role: role}, password, function(err) {
        if (err) {
          if(err.name === "UserExistsError") {
            res.status(409).json("User already exist!");
          }

          res.status(500).json("User cannot be registerd!");
        } else {
          passport.authenticate("local")(req, res, function() {
            res.redirect("/url");
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