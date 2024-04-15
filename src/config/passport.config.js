const { app } = require("..");
const User = require("../models/User");

const initPassport = (app, passport, googleStrategy) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new googleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
                passReqToCallback: true,
            },
            function (request, accessToken, refreshToken, profile, done) {
                // Save the user profile to the database or do other actions here

                return done(null, profile); // Make sure to call done with the profile
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
};

module.exports = { initPassport };
