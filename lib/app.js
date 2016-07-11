const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");


/**
 * Setup express app
 */
const app = express();
const passport = require("./passport");

/**
 * Parsers
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Gate Keeper
 */
 app.use(passport.authenticate("basic", { session: false }));

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
