const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function assignOwner() {
    try {
        await mongoose.connect(MONGO_URL);

        const ownerId = new mongoose.Types.ObjectId(
            "6acb9d14b9893c2e57e1b254"
        );

        const result = await Listing.updateMany(
            { owner: { $exists: false } },
            { $set: { owner: ownerId } }
        );

        console.log("Listings updated:", result.modifiedCount);
    } catch (err) {
        console.log("Error:", err.message);
    } finally {
        await mongoose.disconnect();
    }
}

assignOwner();