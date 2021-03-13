const express = require("express");
const router = express.Router();
const User = require("../models/User");
const passport = require('passport');

// @route     GET /login
// @desc      Render Login view
router.get("/", function(req, res) {
  res.render("login");
});


// @route     POST /login
// @desc      Login user
router.post("/",function(req, res) {
  try {
    const { username, password } = req.body;

    if (username && password) {
      let user = new User({username, password});

      req.login(user, function(err) {
        if (err) {
          res.render('login', {success: false, error: "Cannot Login!"});
        } else {
          passport.authenticate("local", function(err, user, info) {
            if (err) { 
              res.render('login', {success: false, error: "Server error!"});
            }
            if (!user) { 
              res.render('login', {success: false, error: info.message});
            }
            res.redirect("/url");
          })(req, res);
        }
      });
    } else {
      res.render('login', {success: false, error: "Invalid Input"});
    }
  } catch (err) {
    console.error(err);
    res.render('login', {success: false, error: "Login: Server error"});
  }
});



module.exports = router;