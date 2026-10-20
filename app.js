require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const ExpressError = require("./middleware/error.js");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");



// DATABASE URL
// DATABASE URL
const MONGO_URL = process.env.MONGO_URL;


// DATABASE CONNECTION
main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}


// EJS SETUP
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);


// MIDDLEWARE
// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("mySecretString"));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));


// SESSION OPTIONS
const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};
// SESSION MIDDLEWARE
app.use(session(sessionOptions));

// FLASH MIDDLEWARE
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


app.use("/demouser", async (req, res, next) => {
    let fakeUser=new User({
        username:"delta-student",
        email:"student@gmail.com"
    });

    let registeredUser = await User.register(fakeUser,"helloworld");
    res.send(registeredUser);

});

// CUSTOM MIDDLEWARE
app.use((req, res, next) => {
    console.log("Middleware is running");
    next();
});


// ROOT ROUTE
app.get("/", (req, res) => {
    if (!req.session.visitCount) {
        req.session.visitCount = 1;
    } else {
        req.session.visitCount++;
    }

    res.send(
        `You have visited this page ${req.session.visitCount} times.`
    );
});

// LISTING ROUTER
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/users", userRouter);




// 404 ERROR HANDLING
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});


// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
    const {
        statusCode = 500,
        message = "Something went wrong"
    } = err;

    res.status(statusCode).send(message);
});


// SERVER
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});