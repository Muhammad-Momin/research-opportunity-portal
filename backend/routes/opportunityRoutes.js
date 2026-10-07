const express = require("express");

const router = express.Router();

const {
    createOpportunity,
    getAllOpportunities,
    getOpportunityById,
    updateOpportunity,
    deleteOpportunity
} = require("../controllers/opportunityController");

// POST /api/opportunities
router.post("/", createOpportunity);
// GET /api/opportunities
router.get("/", getAllOpportunities);
// GET /api/opportunities/:id
router.get("/:id", getOpportunityById);
// PUT /api/opportunities/:id
router.put("/:id", updateOpportunity);
// DELETE /api/opportunities/:id
router.delete("/:id", deleteOpportunity);

module.exports = router;