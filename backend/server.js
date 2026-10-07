const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./config/db");
const opportunityRoutes = require("./routes/opportunityRoutes");

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/api/opportunities", opportunityRoutes);

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Research Opportunity Portal API is running"
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});