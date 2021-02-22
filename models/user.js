const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  /* password: {
    type: String,
    required: [true, "Password is required!"],
  } */
});

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;