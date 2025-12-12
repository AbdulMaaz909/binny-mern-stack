# 🎬 MERN Stack Movie Application

A full-stack movie application built with the MERN (MongoDB, Express, React, Node.js) stack. This application allows users to view, search, and sort a list of movies. It also includes an administrative panel for authenticated admins to manage (Create, Update, Delete) the movie catalog.

## ✨ Features

### User Dashboard (`/dashboard`)

* **Authentication:** Secure registration and login.
* **Movie Browsing:** View a paginated list of movies.
* **Search:** Search movies by title or description.
* **Sorting:** Sort movies by Name, Rating, Release Date, or Duration in ascending or descending order.
* **Profile Menu:** Dropdown menu to view user details and logout.

### Admin Dashboard (`/admindashboard`)

* **Admin-only Access:** Restricted access via an `AdminRoute` based on the user's role (must be 'admin').
* **Movie Management (CRUD):**
  * **Create:** Add new movies (Title, Description, Rating, Release Date, Duration).
  * **Update:** Edit existing movie details.
  * **Delete:** Remove movies from the database with confirmation dialog.

## 🛠️ Technologies Used

### Backend (Node.js/Express)

* **Framework:** Express.
* **Database:** MongoDB via Mongoose ORM.
* **Authentication:** JSON Web Tokens (JWT) for session management and `bcryptjs` for password hashing.
* **Utilities:** `cors`, `dotenv`.

### Frontend (React)

* **Framework:** React with Vite.
* **Styling:** Material-UI (MUI) components.
* **Routing:** `react-router-dom`.
* **Form Management:** `react-hook-form` and `yup` for validation.
* **API Client:** Axios (configured with an interceptor to handle JWT tokens and unauthorized errors).
* **Notifications:** `react-hot-toast`.

## ⚙️ Prerequisites

You must have the following installed on your system:

* Node.js (LTS version recommended, minimum required by some dependencies is generally 18 or higher)
* MongoDB installed locally or a connection string to a hosted MongoDB service (like MongoDB Atlas).

## 🚀 Setup and Installation

### 1. Backend Setup

Navigate to the `backend` directory.

```bash
cd backend
npm install
```

#### Environment Variables

Create a file named `.env` in the `backend` directory with the following variables:
PORT=5000
MONGO_URI=mongodb://localhost:27017/Movie_Application
JWT_SECRET=f8a76c9b2e9347a8c3d1f98bb230d4e1f5ab900c7ce88921

#### Run the Backend

**Bash**

```
npm run dev
```

The server will start on the specified port (default is `5000`).

### 2. Frontend Setup

Navigate to the `frontend` directory.

**Bash**

```
cd ../frontend
npm install
```

#### Environment Variables

Create a file named `.env` in the `frontend` directory with the base URL for the backend API:

```
VITE_BASE_URL=http://localhost:5000
```

*(Note: If your backend is running on a different port or host, adjust `VITE_BASE_URL` accordingly).*

#### Run the Frontend

**Bash**

```
npm run dev
```

The client will start (default port is `8080`).

The application should now be running. Open your browser to `http://localhost:8080` (or the port specified by Vite).

## 🔑 Initial Admin User

To access the `/admindashboard`, you need a user with the `role: "admin"`.

1. Register a new user through the `/register` page.
2. Manually update the `role` field in the MongoDB database for that user from `"user"` to `"admin"`.
3. Log in with the now-admin user's credentials. You will be redirected to `/admindashboard`.
