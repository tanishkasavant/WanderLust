const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            email,
            username,
        });

        const registeredUser = await User.register(
            newUser,
            password
        );

        console.log(registeredUser);

        req.flash("success", "Welcome to WanderLust!");
        res.redirect("/listings");

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/users/signup");
    }
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("success", "You have logged out successfully!");
        res.redirect("/listings");
    });
};