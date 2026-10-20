const express = require("express");
const router = express.Router();

const listingController = require("../controllers/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { validateListing } = require("../middleware/validation.js");
const { isLoggedIn } = require("../middleware/isLoggedIn.js");
const { isOwner } = require("../middleware/isOwner.js");
const upload = require("../middleware/multer.js");


// INDEX
router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(
    isLoggedIn,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.createListing)
);

// NEW
router.get("/new", isLoggedIn, listingController.renderNewForm);


// SHOW + UPDATE + DELETE
router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
   .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validateListing,
    wrapAsync(listingController.updateListing)
)
    .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
);


// EDIT
router.get(
    "/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);


module.exports = router;