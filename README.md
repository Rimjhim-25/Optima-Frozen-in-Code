Optima – College Management System

Optima is a full‑stack college management system that streamlines day‑to‑day campus operations for admins, faculty, and students. It centralizes data, reduces manual work, and provides a modern dashboard experience.

Features
Admin dashboard for managing departments, courses, batches, and users.

Student module for viewing classes, resources, announcements, and schedules.

Faculty module for managing attendance, assignments, and resource sharing.

Role‑based authentication and protected routes.

Responsive, dashboard‑style UI built for both desktop and laptop usage.

Tech stack 

Frontend: React, React Router, Tailwind CSS / custom CSS, Vite.

Backend: Node.js, Express (if used), REST APIs.

Database: MongoDB / any other DB you chose.

Tools: Git, GitHub, VS Code.

Getting started
Prerequisites
Node.js (LTS) and npm installed.

Git installed.

A MongoDB instance or your chosen database running (if backend is connected)
 
Clone and Install 
# clone repository
git clone https://github.com/Rimjhim-25/Optima-Frozen-in-Code.git
cd Optima-Frozen-in-Code

# install frontend
cd frontend
npm install

# in another terminal: install backend (if in /backend)
cd backend
npm install

Run the app
# frontend
cd frontend
npm run dev

# backend
cd backend
npm run dev

By default, the frontend runs on something like http://localhost:5173 and the backend on http://localhost:5000 (update these URLs if yours are different)


Project structure (example)

Optima-Frozen-in-Code/
├── backend/  New Folder        # Server code, routes, models, controllers
└── frontend/         # React app (Vite)
    ├── src/
    │   ├── api/      # API helpers
    │   ├── components/
    │   ├── context/
    │   ├── pages/    # Dashboards, login, resources, etc.
    │   └── App.jsx
    ├── public/
    ├── index.html
    └── vite.config.js
