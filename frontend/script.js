const API_URL = "/api/opportunities";

const opportunityForm = document.getElementById("opportunityForm");
const opportunitiesContainer = document.getElementById(
    "opportunitiesContainer"
);
const message = document.getElementById("message");

let editingId = null;


// ===============================
// LOAD ALL OPPORTUNITIES
// ===============================

async function loadOpportunities() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to load opportunities.");
        }

        const opportunities = await response.json();

        displayOpportunities(opportunities);

    } catch (error) {
        console.error(error);

        opportunitiesContainer.innerHTML =
            "<p>Failed to load research opportunities.</p>";
    }
}


// ===============================
// DISPLAY OPPORTUNITIES
// ===============================

function displayOpportunities(opportunities) {

    if (opportunities.length === 0) {
        opportunitiesContainer.innerHTML =
            "<p>No research opportunities available.</p>";

        return;
    }

    opportunitiesContainer.innerHTML = "";

    opportunities.forEach((opportunity) => {

        const card = document.createElement("div");

        card.className = "opportunity-card";

        card.innerHTML = `
            <h3>${opportunity.title}</h3>

            <p>
                <strong>Description:</strong>
                ${opportunity.description}
            </p>

            <p>
                <strong>Research Area:</strong>
                ${opportunity.research_area}
            </p>

            <p>
                <strong>Faculty:</strong>
                ${opportunity.faculty_name}
            </p>

            <p>
                <strong>Department:</strong>
                ${opportunity.department}
            </p>

            <p>
                <strong>Required Skills:</strong>
                ${opportunity.required_skills}
            </p>

            <p>
                <strong>Available Positions:</strong>
                ${opportunity.available_positions}
            </p>

            <p>
                <strong>Application Deadline:</strong>
                ${opportunity.application_deadline}
            </p>

            <p>
                <strong>Status:</strong>

                <span class="${
                    opportunity.status === "Open"
                        ? "status-open"
                        : "status-closed"
                }">
                    ${opportunity.status}
                </span>
            </p>

            <div class="action-buttons">

                <button
                    class="view-btn"
                    onclick="viewOpportunity(${opportunity.id})">
                    View
                </button>

                <button
                    class="edit-btn"
                    onclick="editOpportunity(${opportunity.id})">
                    Edit
                </button>

                ${
                    opportunity.status === "Open"
                        ? `
                            <button
                                class="close-btn"
                                onclick="closeOpportunity(${opportunity.id})">
                                Close
                            </button>
                          `
                        : ""
                }

                <button
                    class="delete-btn"
                    onclick="deleteOpportunity(${opportunity.id})">
                    Delete
                </button>

            </div>
        `;

        opportunitiesContainer.appendChild(card);
    });
}


// ===============================
// CREATE / UPDATE OPPORTUNITY
// ===============================

opportunityForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const opportunityData = {
        title: document.getElementById("title").value.trim(),
        description: document.getElementById("description").value.trim(),
        research_area: document.getElementById("research_area").value.trim(),
        faculty_name: document.getElementById("faculty_name").value.trim(),
        department: document.getElementById("department").value.trim(),
        required_skills: document.getElementById("required_skills").value.trim(),
        available_positions: Number(
            document.getElementById("available_positions").value
        ),
        application_deadline:
            document.getElementById("application_deadline").value,
        status: document.getElementById("status").value
    };


    // Frontend validation
    if (
        !opportunityData.title ||
        !opportunityData.description ||
        !opportunityData.research_area ||
        !opportunityData.faculty_name ||
        !opportunityData.department ||
        !opportunityData.required_skills ||
        !opportunityData.available_positions ||
        !opportunityData.application_deadline
    ) {
        showMessage("Please fill in all required fields.", "red");
        return;
    }


    if (opportunityData.available_positions < 1) {
        showMessage(
            "Available positions must be at least 1.",
            "red"
        );
        return;
    }


    try {

        let response;

        // UPDATE
        if (editingId !== null) {

            response = await fetch(`${API_URL}/${editingId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(opportunityData)
            });

        }

        // CREATE
        else {

            response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(opportunityData)
            });

        }


        const result = await response.json();


        if (!response.ok) {
            showMessage(
                result.message || "Something went wrong.",
                "red"
            );
            return;
        }


        if (editingId !== null) {

            showMessage(
                "Research opportunity updated successfully!",
                "green"
            );

        } else {

            showMessage(
                "Research opportunity created successfully!",
                "green"
            );
        }


        opportunityForm.reset();

        editingId = null;

        document.querySelector(
            '#opportunityForm button[type="submit"]'
        ).textContent = "Create Opportunity";


        loadOpportunities();

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to connect to the server.",
            "red"
        );
    }
});


// ===============================
// VIEW OPPORTUNITY
// ===============================

async function viewOpportunity(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const opportunity = await response.json();

        if (!response.ok) {
            alert(opportunity.message);
            return;
        }


        alert(
`Research Opportunity

Title: ${opportunity.title}

Description:
${opportunity.description}

Research Area: ${opportunity.research_area}

Faculty: ${opportunity.faculty_name}

Department: ${opportunity.department}

Required Skills: ${opportunity.required_skills}

Available Positions: ${opportunity.available_positions}

Application Deadline: ${opportunity.application_deadline}

Status: ${opportunity.status}`
        );

    } catch (error) {

        console.error(error);

        alert("Unable to retrieve opportunity.");
    }
}


// ===============================
// EDIT OPPORTUNITY
// ===============================

async function editOpportunity(id) {

    try {

        const response = await fetch(`${API_URL}/${id}`);

        const opportunity = await response.json();

        if (!response.ok) {
            showMessage(opportunity.message, "red");
            return;
        }


        document.getElementById("title").value =
            opportunity.title;

        document.getElementById("description").value =
            opportunity.description;

        document.getElementById("research_area").value =
            opportunity.research_area;

        document.getElementById("faculty_name").value =
            opportunity.faculty_name;

        document.getElementById("department").value =
            opportunity.department;

        document.getElementById("required_skills").value =
            opportunity.required_skills;

        document.getElementById("available_positions").value =
            opportunity.available_positions;

        document.getElementById("application_deadline").value =
            opportunity.application_deadline.split("T")[0];

        document.getElementById("status").value =
            opportunity.status;


        editingId = id;


        document.querySelector(
            '#opportunityForm button[type="submit"]'
        ).textContent = "Update Opportunity";


        showMessage(
            "Editing opportunity. Update the fields and submit.",
            "blue"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to load opportunity.",
            "red"
        );
    }
}


// ===============================
// CLOSE OPPORTUNITY
// ===============================

async function closeOpportunity(id) {

    const confirmClose = confirm(
        "Are you sure you want to close this opportunity?"
    );

    if (!confirmClose) {
        return;
    }

    try {

        // Get the current opportunity
        const getResponse = await fetch(`${API_URL}/${id}`);
        const opportunity = await getResponse.json();

        if (!getResponse.ok) {
            showMessage(opportunity.message, "red");
            return;
        }

        // Send only the fields required by the PUT API
        const updatedOpportunity = {
            title: opportunity.title,
            description: opportunity.description,
            research_area: opportunity.research_area,
            faculty_name: opportunity.faculty_name,
            department: opportunity.department,
            required_skills: opportunity.required_skills,
            available_positions: opportunity.available_positions,
            application_deadline: opportunity.application_deadline.split("T")[0],
            status: "Closed"
        };

        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedOpportunity)
        });

        const result = await response.json();

        if (!response.ok) {
            showMessage(
                result.message || "Failed to close opportunity.",
                "red"
            );
            return;
        }

        showMessage(
            "Research opportunity closed successfully!",
            "green"
        );

        // Refresh the cards
        loadOpportunities();

    } catch (error) {

        console.error("Close error:", error);

        showMessage(
            "Unable to connect to the server.",
            "red"
        );
    }
}


// ===============================
// DELETE OPPORTUNITY
// ===============================

async function deleteOpportunity(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this opportunity?"
    );

    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });


        const result = await response.json();


        if (!response.ok) {

            showMessage(
                result.message || "Failed to delete opportunity.",
                "red"
            );

            return;
        }


        showMessage(
            "Research opportunity deleted successfully!",
            "green"
        );


        loadOpportunities();

    } catch (error) {

        console.error(error);

        showMessage(
            "Unable to connect to the server.",
            "red"
        );
    }
}


// ===============================
// SHOW MESSAGE
// ===============================

function showMessage(text, color) {

    message.textContent = text;
    message.style.color = color;


    setTimeout(() => {

        message.textContent = "";

    }, 4000);
}


// ===============================
// INITIAL LOAD
// ===============================

loadOpportunities();