# frontend_of_student_and_courses

A simple full-stack student and course management project.

## Project structure

- `frontend/` — Static HTML/CSS/JS UI for student registration, listing, editing, deleting, and searching.
- `backend/` — Node.js + Express + MongoDB REST API for students and courses.

## Tech stack

- Frontend: HTML, CSS, JavaScript (vanilla)
- Backend: Node.js, Express, Mongoose
- Database: MongoDB
- Auth: JWT (student login endpoint)

## Features

- Student registration and login
- Admin-style password reset endpoint (insecure: no reset-token verification)
- List, search, update, and delete students
- Create, list, update, and delete courses

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB connection string

## Backend setup

1. Go to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create/update `.env` file with:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRETKEY=your_jwt_secret
   ```
4. Start backend server:
   ```bash
   npm run dev
   ```

Server runs on: `http://localhost:5000`

## Frontend setup

The frontend is static and does not require a build step.

1. Open `frontend/index.html` in your browser, or serve the `frontend/` folder with any static server.
2. Ensure backend is running at `http://localhost:5000`.

## API endpoints

### Student routes (`/students`)

- `POST /students/register` — register a student
- `POST /students/login` — login a student
- `PUT /students/forgetpassword` — admin-style password reset (insecure: no reset-token verification)
- `GET /students/allstudents` — get all students
- `GET /students/getdetails/:id` — get student by ID
- `POST /students/search` — search students by name/contact
- `PUT /students/updatedetails/:id` — update student
- `DELETE /students/deletedetails/:id` — delete student

### Course routes (`/courses`)

- `POST /courses/registercourse` — create course
- `GET /courses/allcourses` — get all courses
- `GET /courses/course/:id` — get course by ID
- `PUT /courses/updatecourse/:id` — update course
- `DELETE /courses/deletecourses/:id` — delete course

## Notes

- Some student APIs include mixed response formats (`success` vs `message` flags).
- Keep your `.env` file private and never commit real credentials.
