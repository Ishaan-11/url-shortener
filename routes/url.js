const express = require("express");
const validUrl = require('valid-url');
const { nanoid } = require('nanoid');
const Url = require("../models/Url");
const router = express.Router();


// @route     GET /url
// @desc      Render url show view
router.get("/", async function(req, res) {
  if(req.isAuthenticated()) {
    const shortUrls = await Url.find()
    res.render("url/show", { shortUrls : shortUrls });
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
          res.status(409).json("Url already exist: " + checkFullUrl.shortUrl);
        } else {
          if (!shortUrl) {
            shortUrl = nanoid(10);
          }
          let checkShortUrl = await Url.findOne({ shortUrl });

          if (checkShortUrl) {
            res.status(409).json("Short Url already exist!. Please provide a another url!");
          }

          url = new Url({
            fullUrl,
            shortUrl,
            date: new Date()
          });
  
          url.save(function (err) {
            if (err) {
              res.status(500).json("Url cannot be created!");
            } else {
              res.redirect("/url");
            }
          });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
      }
    } else {
      res.status(401).json('Invalid long url');
    }
  } else {
    res.redirect("/login");
  }
});

module.exports = router;