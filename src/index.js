require("dotenv").config();
const express = require("express");
const app = express();

const passport = require("passport");
app.use(passport.initialize());
const googleStrategy = require("passport-google-oauth2").Strategy;

passport.use(
    new googleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            passReqToCallback: true,
        },
        (accessToken, refreshToken, profile, done) => {
            const user = {
                id: profile.id,
                name: profile.displayname,
                email: profile.email[0].value,
            };

            return done(null, user);
        }
    )
);

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/profile"); // Redirect to protected profile page
    }
);

app.get("/profile", (req, res) => {
    if (req.user) {
        res.json({ message: "Welcome, " + req.user.name });
    } else {
        res.redirect("/login");
    }
});

app.listen(8080, () => {
    console.log(`Server is running on port ${8080}`);
});
