const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/", require("./route"))

module.exports = app;
