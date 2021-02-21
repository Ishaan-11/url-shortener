const express = require("express");
const router = express.Router();


// @route     GET /
// @desc      Render Home view
router.get("/", function(req, res) {
  res.render("home");
});

module.exports = router;