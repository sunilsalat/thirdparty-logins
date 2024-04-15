require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { loadRoutes } = require("./routes");
const { initPassport } = require("./config/passport.config");

const app = express();
const googleStrategy = require("passport-google-oauth2").Strategy;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());

initPassport(app, passport, googleStrategy);
loadRoutes(app);

module.exports = { app };
