const Review = require("../models/review.js");
const ExpressError = require("./error.js");

module.exports = async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${req.params.id}`);
    }

    if (!review.author || !review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to delete this review!");
        return res.redirect(`/listings/${req.params.id}`);
    }

    next();
};