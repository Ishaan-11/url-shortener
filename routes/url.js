const express = require("express");
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const { Url } = require("../models/Url");
const User = require("../models/User");
const router = express.Router();


// @route     GET /url
// @desc      Render url show view
router.get("/", async function(req, res) {
  if(req.isAuthenticated()) {
    const {urls: shortUrls} = await User.findOne({_id: req.user.id});
    res.render("url/show", { shortUrls });
  } else {
    res.redirect("/login");
  }
});


// @route     GET /url/admin
// @desc      Render url admin view
router.get("/admin", async function(req, res) {
  if(req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      const users = await User.find({"username": {$ne : req.user.username}});
      res.render("url/admin", { users });
    } else {
      res.redirect("/url");
    }
  } else {
    res.redirect("/login");
  }
});


// @route     GET /url/add
// @desc      Render url add view
router.get("/add", function(req, res) {
  if(req.isAuthenticated()) {
    res.render("url/add");
  } else {
    res.redirect("/login");
  }
});


// @route     Post /url/add
// @desc      Create a short url
router.post("/add", async function(req, res) {
  if (req.isAuthenticated()) {
    let { fullUrl, shortUrl } = req.body;

    if (validUrl.isUri(fullUrl)) {
      try {
        let checkFullUrl = await Url.findOne({ fullUrl });
  
        if (checkFullUrl) {
          res.render('url/add', {success: false, error: "Url already exist!"});
        } else {
          if (!shortUrl) {
            shortUrl = nanoid(10);// generate random string
          }
          let checkShortUrl = await Url.findOne({ shortUrl });

          if (checkShortUrl) {
            res.render('url/add', {success: false, error: "Short Url already exist!. Please provide a another url!"});
          } else {
            url = new Url({
              fullUrl,
              shortUrl,
              date: new Date()
            });
  
            url.save(function (err) {
              if (err) {
                res.render('url/add', {success: false, error: "Url cannot be created!"});
              } else {
                //save url to its user
                User.findOne({_id: req.user.id}, function(err, foundUser) {
                  foundUser.urls.push(url);
                  foundUser.save(function(err) {
                    if (err) {
                      res.render('url/add', {success: false, error: "Cannot save url in user!"});
                    }
                    res.redirect("/url");
                  });
                });
              }
            });
          }
        }
      } catch (err) {
        console.error(err);
        res.render('url/add', {success: false, error: "Server error"});
      }
    } else {
      res.render('url/add', {success: false, error: "Invalid long url"});
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;