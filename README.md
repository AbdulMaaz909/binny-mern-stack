# 🎬 MERN Stack Movie Application

A full-featured movie management system built using the MERN (MongoDB, Express, React, Node.js) stack. This application provides a dual interface: a dashboard for authenticated users to browse and filter movies, and a secure administration panel for CRUD operations on the movie catalog.

## 🚀 Live Application

| **Component**              | **URL**                                                                      |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| **Frontend (Live Demo)**   | [https://binny-mern-stack.vercel.app](https://binny-mern-stack.vercel.app/)           |
| **Backend (API Base URL)** | [https://binny-mern-stack-kb9j.vercel.app](https://binny-mern-stack-kb9j.vercel.app/) |

## 1.username and password for user
username:abdul@gmail.com
password:123123

## 2.username and password for admin
username:khan@gmail.com
password:123123
---

## ✨ Key Features

### 👤 User Dashboard (`/dashboard`)

* **Secure Authentication:** Users can register and log in to access the protected dashboard.
* **Movie Browsing:** View a paginated list of movies, utilizing `page` and `limit` query parameters.
* **Search Functionality:** Filter movies by matching keywords in the `title` or `description`.
* **Advanced Sorting:** Sort movies by Name (`title`), Rating, Release Date, or Duration in ascending or descending order.
* **User Profile:** Dropdown menu to view user details and logout functionality.

### 👑 Admin Dashboard (`/admindashboard`)

* **Role-Based Access Control (RBAC):** Access is restricted to users with the `admin` role via middleware.
* **Full CRUD Functionality:** Manage the entire movie catalog:
  * **Create:** Add new movies with validation for all required fields.
  * **Update:** Modify existing movie details using a dedicated form.
  * **Delete:** Permanently remove movies after a confirmation step.

---

## 🛠️ Technology Stack

| **Area**               | **Technology**          | **Purpose & Version**                                                              |
| ---------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| **Backend Framework**  | `Node.js`+`Express`       | High-performance server environment.                                                     |
| **Database**           | `MongoDB`+`Mongoose`      | Flexible, schema-based modeling for MongoDB.                                             |
| **Authentication**     | `jsonwebtoken`,`bcryptjs` | JWT for token-based API security and password hashing.                                   |
| **Frontend Framework** | `React`+`Vite`            | Modern UI development with a fast build tool.                                            |
| **UI/Styling**         | `Material-UI (MUI)`         | Ready-to-use, responsive React components.                                               |
| **Form Management**    | `react-hook-form`,`yup`   | Declarative forms with schema-based validation.                                          |
| **HTTP Client**        | `Axios`                     | Configured with interceptors for token management in requests and 401 response handling. |

---

## ⚙️ Setup & Local Installation

### Prerequisites

You must have the following installed on your system:

* **Node.js** (LTS version recommended, minimum 18+)
* A running **MongoDB instance** or a connection string (`MONGO_URI`).

### 1. Backend Setup

**Bash**

```
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file for environment variables
touch .env
```

#### `.env` Configuration (Backend)

The backend uses `dotenv` to load environment variables. Add the following to your `.env` file:

**Code snippet**

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/Movie_Application
JWT_SECRET=f8a76c9b2e9347a8c3d1f98bb230d4e1f5ab900c7ce88921
# Replace values with your actual MongoDB connection string and a secure secret.
```

#### Run the Server

**Bash**

```
npm run dev
# Server will run on http://localhost:5000 (or specified PORT)
```

### 2. Frontend Setup

**Bash**

```
# Navigate to the frontend directory
cd ../frontend

# Install dependencies
npm install

# Create a .env file for the build tool (Vite)
touch .env
```

#### `.env` Configuration (Frontend)

The frontend uses Vite's environment variables to configure the API base URL:

**Code snippet**

```
VITE_BASE_URL=http://localhost:5000
# Update this URL if the backend is running on a different port/host.
```

#### Run the Client

**Bash**

```
npm run dev
# Client will run on http://localhost:8080 (or port specified by Vite)
```

---

## 💻 API Endpoints Documentation

The base path for all API routes is `/api`.

### Authentication Routes (`/api/auth`)

| **Method** | **Endpoint** | **Description**                                    | **Requires Authentication** |
| ---------------- | ------------------ | -------------------------------------------------------- | --------------------------------- |
| `POST`         | `/register`      | Creates a new user account with default role `"user"`. | No                                |
| `POST`         | `/login`         | Authenticates user credentials and returns a JWT.        | No                                |

### Public & User Movie Routes (`/api/movie`)

| **Method** | **Endpoint** | **Query Parameters** | **Description**                                                              | **Requires Authentication** |
| ---------------- | ------------------ | -------------------------- | ---------------------------------------------------------------------------------- | --------------------------------- |
| `GET`          | `/movies`        | `page`,`limit`         | Fetches a paginated list of movies.                                                | No                                |
| `GET`          | `/movies/sorted` | `sortBy`,`order`       | Fetches a paginated list of movies sorted by criteria (e.g.,`rating`,`title`). | No                                |
| `GET`          | `/movies/search` | `query`                  | Searches movies by partial match in title or description.                          | Yes                               |

### Admin Movie Routes (Requires `admin` role)

| **Method** | **Endpoint**   | **Path Parameters** | **Request Body Fields**                           | **Description**                  |
| ---------------- | -------------------- | ------------------------- | ------------------------------------------------------- | -------------------------------------- |
| `POST`         | `/addmovie`        | None                      | `{title, description, rating, releaseDate, duration}` | Creates a new movie entry.             |
| `PUT`          | `/updatemovie/:id` | `id`(Movie ID)          | `{...fields to update}`                               | Modifies details of an existing movie. |
| `DELETE`       | `/deletemovie/:id` | `id`(Movie ID)          | None                                                    | Deletes a movie from the database.     |

---

## 🔑 Initial Admin Setup

To access the administrative Dashboard at the `/admindashboard` route, your user account must have the MongoDB `role` field explicitly set to `"admin"`.

1. **Register:** Create a new user account through the application's `/register` page.
2. **Database Modification:** Connect to your MongoDB instance and manually update the `role` field for the newly registered user in the `users` collection:
   **JavaScript**

   ```
   db.users.updateOne({ email: "your.email@example.com" }, { $set: { role: "admin" } });
   ```
3. **Login:** Use the updated user's credentials to log in. The application will recognize the `admin` role and redirect you to the Admin Dashboard.
