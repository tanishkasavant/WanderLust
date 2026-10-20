const Listing = require("../models/listing.js");
const geocodingClient = require("../utils/geocoding.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id).populate("reviews");

    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAP_TOKEN,
    });
};
module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;

    if (req.file) {
        newListing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    const response = await geocodingClient
        .forwardGeocode({
            query: `${newListing.location}, ${newListing.country}`,
            limit: 1,
        })
        .send();

    if (response.body.features.length > 0) {
        newListing.geometry = {
            type: "Point",
            coordinates: response.body.features[0].geometry.coordinates,
        };
    }

    await newListing.save();

    req.flash("success", "Listing created successfully!");
    res.redirect("/listings");
};
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    Object.assign(listing, req.body.listing);

    if (req.file) {
        listing.image = {
            url: req.file.path,
            filename: req.file.filename,
        };
    }

    const response = await geocodingClient
        .forwardGeocode({
            query: `${listing.location}, ${listing.country}`,
            limit: 1,
        })
        .send();

    if (response.body.features.length > 0) {
        listing.geometry = {
            type: "Point",
            coordinates: response.body.features[0].geometry.coordinates,
        };
    }

    await listing.save();

    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    const { id } = req.params;

    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing deleted successfully!");

    res.redirect("/listings");
};