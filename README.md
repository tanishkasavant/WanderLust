# WanderLust 🌍

WanderLust is a travel accommodation listing web application where users can explore places to stay, view property details, upload listings, and share their experiences through reviews.

## Features

- **Explore Listings:** Browse available travel accommodations.
- **User Authentication:** Sign up, log in, and log out securely using Passport.js.
- **Create Listings:** Authenticated users can add new properties with descriptions, prices, locations, and images.
- **Edit & Delete Listings:** Listing owners can manage their properties.
- **Reviews & Ratings:** Users can leave ratings and comments on listings.
- **Interactive Maps:** View listing locations using Mapbox.
- **Image Uploads:** Upload and store listing images using Cloudinary.
- **Price Display:** Toggle prices to include 18% GST.
- **Responsive UI:** Interface styled with Bootstrap and custom CSS.

## Tech Stack

**Frontend:** HTML, CSS, JavaScript, EJS, Bootstrap

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** Passport.js, Passport Local, Express Session

**Other Tools & Services:** Cloudinary, Mapbox, Multer, Joi

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/tanishkasavant/Green-Grid-India.git
```

### 2. Navigate to the project directory

```bash
cd Green-Grid-India
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your credentials:



### 5. Start the application

```bash
node app.js
```

The server runs at:

http://localhost:8080

## Project Structure

```text
WanderLust/
├── controllers/
├── init/
├── middleware/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
├── schema/
├── utils/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
├── app.js
├── cloudConfig.js
├── package.json
└── .gitignore
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `MONGO_URL` | MongoDB connection string |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox access token for maps and geocoding |

## Security

- Keep credentials and API keys in the `.env` file.
- Never commit your `.env` file to GitHub.
- The `.gitignore` file excludes environment secrets and `node_modules`.

---

Made with  using Node.js, Express, and MongoDB.
