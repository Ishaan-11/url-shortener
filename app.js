const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


// Connect to database
connectDB();


/* Routes */
app.use("/", require("./routes/index"));
app.use("/login", require("./routes/login"));
app.use("/register", require("./routes/register"));




app.listen(3000, function() {
  console.log("Server started on port 3000.");
});