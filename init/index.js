const mongoose =  require("mongoose");
const initData =  require ("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connect to DB");
})
 .catch((err) => {
    console.log(err);
 });
async function main() {
    await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
    await Listing.deleteMany({});

    const listings = initData.data.map((listing) => {
        if (listing.image && typeof listing.image === "object") {
            listing.image = listing.image.url;
        }

        return listing;
    });

    await Listing.insertMany(listings);

    console.log("data was initialized");
};
initDB();