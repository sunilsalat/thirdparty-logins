const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/auth");
const User = require("../models/User");

// TODO ROUTES
router.get("/todo", [isAuthenticated], todoController.getAllTodos);
router.post("/todo/create", [isAuthenticated], todoController.createTodo);

// USER ROUTES
router.get("/auth/login", (req, res) => {
    res.send("http://localhost:8080/auth/google");
});

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/auth/login" }),
    async (req, res) => {
        let existingUser = await User.findOne({
            googleId: req.user.googleId,
        });

        if (!existingUser) {
            existingUser = new User({
                googleId: req.user.googleId,
                displayName: req.user.displayName,
                email: req.user.email,
            });
            await existingUser.save();
        }

        res.redirect("/auth/profile");
    }
);

router.get("/auth/profile", (req, res) => {
    if (req.user) {
        res.json({ message: "Welcome, " + req.user.email });
    } else {
        res.redirect("/auth/login");
    }
});

router.get("/auth/logout", async (req, res) => {
    req.session = null;
    req.logout(() => {});
    res.send("loggedout");
});

module.exports = router;
