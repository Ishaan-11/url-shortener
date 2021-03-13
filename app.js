require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');
const connectDB = require("./config/db");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());


// Connect to database
connectDB();


/* Routes */
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));
app.use("/url", require("./routes/url"));
app.use("/logout", require("./routes/logout"));
app.use("/", require("./routes/index"));




app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started successfully!.");
});
