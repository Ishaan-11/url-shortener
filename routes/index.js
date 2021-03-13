const express = require("express");
const { Url } = require("../models/Url");
const router = express.Router();


// @route     GET /
// @desc      Render Home view
router.get("/", function(req, res) {
  res.render("home");
});


// @route     GET /:shortUrl
// @desc      Redirect to Full Url using short Url
router.get('/:shortUrl', async function(req, res) {
  try {
    const url = await Url.findOne({ shortUrl: req.params.shortUrl });

    if (url) {
      let currUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
      console.log(currUrl);
      if (url.fullUrl !== currUrl) { //check for infinite redirect
        res.redirect(url.fullUrl);
      } else {
        res.render('home', {success: false, error: "Infinite redirect detected!"});
      }
    } else {
      res.render('home', {success: false, error: "Url not found"});
    }
  } catch (err) {
    console.error(err);
    res.render('home', {success: false, error: "Server error"});
  }
})

module.exports = router;