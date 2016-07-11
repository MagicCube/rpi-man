const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");


/**
 * Setup express app
 */
const app = express();
/**
 * Parsers
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Statics
 */
app.use(express.static(path.join(__dirname, "../public")));
app.use("/socket.io", express.static(path.join(__dirname, "../node_modules/socket.io-client")));

/**
 * Routers
 */
app.use("/", require("./route"));

module.exports = app;
