const express = require("express");
const router = express.Router();

// @route     GET /login
// @desc      Render Login view
router.get("/", function(req, res) {
  res.render("login");
});

module.exports = router;