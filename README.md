Dialysis Dashboard
Overview

The Dialysis Dashboard is a web application that allows healthcare providers to manage dialysis patients efficiently. It provides a complete overview of patient details including name, age, gender, and dry weight, along with visual statistics such as gender distribution and average age/weight.

The dashboard supports:

Adding new patients

Editing and updating patient details

Deleting patients

Filtering by gender

Visual representation of gender distribution using charts

Features

Patient Management

Add, edit, and delete patient information.

View patient details in a dynamic table.

Statistics

Total number of patients

Average age of patients

Average dry weight of patients

Visualizations

Pie chart showing Male vs Female patient distribution.

Filtering

Filter patients by gender.

Responsive Design

Dashboard works on different screen sizes.

Tech Stack

Frontend: React, TypeScript, Recharts

Backend: Node.js, Express, MongoDB, Mongoose

Styling: CSS

Folder Structure
frontend/
├── src/
│   ├── components/
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── api.ts
│   ├── index.css
│   └── App.tsx
backend/
├── models/
│   └── Patient.ts
├── controllers/
│   └── patientController.ts
├── routes/
│   └── patientRoutes.ts
└── app.ts
Setup & Installation
Backend

Navigate to the backend folder:

cd backend

Install dependencies:

npm install

Create a .env file with your MongoDB URI:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the server:

npm run dev
Frontend

Navigate to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm start

The app will run at http://localhost:3000.

API Endpoints
Method	Endpoint	Description
GET	/api/patients	Fetch all patients
POST	/api/patients	Add a new patient
PUT	/api/patients/:id	Update a patient
DELETE	/api/patients/:id	Delete a patient
Screenshots

Dashboard Table with Patient Details

PieChart showing Gender Distribution

Add/Edit/Delete patient functionality

(Add screenshots here in your repo for better visibility)

Future Enhancements

Search patients by name

Sort table by age, weight, or gender

Advanced visual analytics (bar charts, trends)

Authentication for secure access
