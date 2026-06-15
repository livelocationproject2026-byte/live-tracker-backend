console.log("SERVER FILE LOADED");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const User = require("./models/user");
const Location = require("./models/location");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// STATIC FILES
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

app.get("/test", (req, res) => {
    res.send("Backend Working");
});

// MONGODB CONFIGURATION (Modified for Render using Environment Variables)
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("CRITICAL ERROR: MONGODB_URI environment variable is missing!");
}

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log("Database connection error: ", err);
});

// TEMP USER STORAGE
let tempUser = {};

// ================= ROUTES =================

// HOME
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "dashboard.html")
    );
});

// LOGIN PAGE
app.get("/login", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "login.html")
    );
});

// CREATE ACCOUNT PAGE
app.get("/create-account", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "create-account.html")
    );
});

// PASSWORD PAGE
app.get("/password", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "password.html")
    );
});

// USER DASHBOARD
app.get("/user-dashboard", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "user-dashboard.html")
    );
});

// Tracked Persons
app.get("/get-locations/all", async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.json(locations);
    } catch (err) {
        console.log(err);
        res.status(500).json([]);
    }
});

//=========Delete one coordinate===========
app.delete("/delete-location/:id", async (req, res) => {
    try {
        await Location.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

//==============Delete all coordinates of one person=========
app.delete("/delete-person/:personName", async (req, res) => {
    try {
        await Location.deleteMany({
            personName: req.params.personName
        });
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

// ================= CREATE ACCOUNT =================
app.post("/create-account", async (req, res) => {
    try {
        const { name, email, userid, address } = req.body;
        const existingUser = await User.findOne({ userid });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        tempUser = { name, email, userid, address };
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

// ================= PASSWORD SAVE =================
app.post("/password", async (req, res) => {
    try {
        const { password } = req.body;
        const newUser = new User({
            name: tempUser.name,
            email: tempUser.email,
            userid: tempUser.userid,
            address: tempUser.address,
            password
        });

        await newUser.save();
        tempUser = {};
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
    try {
        const { userid, password } = req.body;
        const user = await User.findOne({ userid });

        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found"
            });
        }

        if (user.password !== password) {
            return res.json({
                success: false,
                message: "Wrong Password"
            });
        }

        res.json({
            success: true,
            user: {
                name: user.name,
                email: user.email,
                userid: user.userid
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

// ================= SAVE LOCATION =================
app.post("/save-location", async (req, res) => {
    try {
        const { personName, latitude, longitude, googleLink } = req.body;

        if (latitude === undefined || longitude === undefined) {
            return res.json({
                success: false,
                message: "Coordinates Missing"
            });
        }

        const newLocation = new Location({
            personName,
            latitude,
            longitude,
            googleLink
        });

        await newLocation.save();
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false });
    }
});

// ================= GET LOCATIONS =================
app.get("/get-locations/:userid", async (req, res) => {
    try {
        const locations = await Location.find().sort({ createdAt: -1 });
        res.json(locations);
    } catch (err) {
        console.log(err);
        res.status(500).json([]);
    }
});

// ================= SERVER (Modified Dynamic Port) =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running dynamically on port ${PORT}`);
});