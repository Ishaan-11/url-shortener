const express = require("express");
const router = express.Router();


// @route     GET /logout
// @desc      Logout the user
router.get("/", function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;