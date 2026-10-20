const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn } = require("../middleware/isLoggedIn.js");
const isReviewAuthor = require("../middleware/isReviewAuthor.js");

const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview } = require("../middleware/validation.js");
const reviewController = require("../controllers/review.js");

router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
);

router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;