const express = require("express");
const router = express.Router();

// @route     GET /login
// @desc      Render Register view
router.get("/", function(req, res) {
  res.render("register");
});

module.exports = router;