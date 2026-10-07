const db = require("../config/db");

// Create a new research opportunity
const createOpportunity = (req, res) => {
    const {
        title,
        description,
        research_area,
        faculty_name,
        department,
        required_skills,
        available_positions,
        application_deadline,
        status
    } = req.body;

    // Basic validation
    if (
        !title ||
        !description ||
        !research_area ||
        !faculty_name ||
        !department ||
        !required_skills ||
        available_positions === undefined ||
        !application_deadline
    ) {
        return res.status(400).json({
            message: "All required fields must be provided."
        });
    }

    const sql = `
        INSERT INTO opportunities
        (
            title,
            description,
            research_area,
            faculty_name,
            department,
            required_skills,
            available_positions,
            application_deadline,
            status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        description,
        research_area,
        faculty_name,
        department,
        required_skills,
        available_positions,
        application_deadline,
        status || "Open"
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to create research opportunity."
            });
        }

        res.status(201).json({
            message: "Research opportunity created successfully.",
            id: result.insertId
        });
    });
};

// Get all research opportunities
const getAllOpportunities = (req, res) => {
    const sql = "SELECT * FROM opportunities ORDER BY id DESC";

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to retrieve research opportunities."
            });
        }

        res.status(200).json(results);
    });
};
// Get one research opportunity by ID
const getOpportunityById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM opportunities WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to retrieve research opportunity."
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Research opportunity not found."
            });
        }

        res.status(200).json(results[0]);
    });
};

// Update a research opportunity
const updateOpportunity = (req, res) => {
    const { id } = req.params;

    const {
        title,
        description,
        research_area,
        faculty_name,
        department,
        required_skills,
        available_positions,
        application_deadline,
        status
    } = req.body;

    if (
        !title ||
        !description ||
        !research_area ||
        !faculty_name ||
        !department ||
        !required_skills ||
        available_positions === undefined ||
        !application_deadline ||
        !status
    ) {
        return res.status(400).json({
            message: "All required fields must be provided."
        });
    }

    const sql = `
        UPDATE opportunities
        SET
            title = ?,
            description = ?,
            research_area = ?,
            faculty_name = ?,
            department = ?,
            required_skills = ?,
            available_positions = ?,
            application_deadline = ?,
            status = ?
        WHERE id = ?
    `;

    const values = [
        title,
        description,
        research_area,
        faculty_name,
        department,
        required_skills,
        available_positions,
        application_deadline,
        status,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to update research opportunity."
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Research opportunity not found."
            });
        }

        res.status(200).json({
            message: "Research opportunity updated successfully."
        });
    });
};
// Delete a research opportunity
const deleteOpportunity = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM opportunities WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Failed to delete research opportunity."
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Research opportunity not found."
            });
        }

        res.status(200).json({
            message: "Research opportunity deleted successfully."
        });
    });
};

module.exports = {
    createOpportunity,
    getAllOpportunities,
    getOpportunityById,
    updateOpportunity,
    deleteOpportunity
};