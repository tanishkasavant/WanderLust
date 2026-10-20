const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userController = require("../controllers/user.js");

router.get(
    "/signup",
    userController.renderSignupForm
);

router.post(
    "/signup",
    wrapAsync(userController.signup)
);

router.get(
    "/login",
    userController.renderLoginForm
);

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/users/login",
        failureFlash: true,
    }),
    (req, res) => {
        req.flash("success", "Welcome back to WanderLust!");
        res.redirect("/listings");
    }
);

router.get(
    "/logout",
    userController.logout
);

module.exports = router;