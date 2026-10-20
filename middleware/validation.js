const { listingSchema } = require("../schema/listing.js");
const ExpressError = require("./error.js");
const { reviewSchema } = require("../schema/review.js");

module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const message = error.details
            .map((el) => el.message)
            .join(", ");

        throw new ExpressError(400, message);
    }

    next();
};
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const message = error.details
            .map((el) => el.message)
            .join(", ");

        throw new ExpressError(400, message);
    }

    next();
};