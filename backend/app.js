const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose"); // ✅ Mongoose for MongoDB
const postRoutes = require("./routes/posts.js");

const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// ✅ Routes
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
    res.send("Hello to Hackoverflow API");
});

mongoose
    .connect(process.env.MONGO_URI, {
    })
    .then(() => {
        console.log("✅ Connected to MongoDB");
        app.listen(PORT, () =>
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        );
    })
    .catch((error) => {
        console.error("❌ MongoDB connection failed:", error.message);
    });
