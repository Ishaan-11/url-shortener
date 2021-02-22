const express = require("express");
const router = express.Router();


// @route     GET /url
// @desc      Render url show view
router.get("/", function(req, res) {
  if(req.isAuthenticated()) {
    res.render("url/show");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;