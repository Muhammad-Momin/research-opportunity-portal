# University Research Opportunity Portal

A web-based Research Opportunity Portal developed using Node.js, Express.js, MySQL, HTML, CSS, and JavaScript.

The system allows students to view university research opportunities and provides CRUD operations for managing research opportunities.

## Features

- Create a new research opportunity
- View all research opportunities
- View a single research opportunity
- Update research opportunity details
- Change opportunity status from Open to Closed
- Delete research opportunities
- Frontend form validation
- Backend validation
- MySQL database storage
- REST API
- Postman API testing

## Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- HTML5
- CSS3
- JavaScript
- Postman
- Git and GitHub

## Project Structure

```text
research-opportunity-portal/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── opportunityController.js
│   ├── routes/
│   │   └── opportunityRoutes.js
│   └── server.js
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── postman/
│   └── Research Opportunity Portal API.postman_collection.json
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md