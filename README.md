# Project Management API

A production-ready REST API for a Project Management System with Authentication, Authorization, Role-Based Access Control (RBAC), JWT-based Access & Refresh Token Authentication, and Project Management features.

---

## Live Demo

**Deployed API:**
https://farminsta-assignment.onrender.com

**Swagger Documentation:**
https://farminsta-assignment.onrender.com/api-docs

**GitHub Repository:**
https://github.com/sahilnikalje/farminsta-assignment.git

---

## Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* bcryptjs
* Zod Validation
* Swagger UI
* Helmet
* CORS
* Cookie Parser
* Express Rate Limit

---

## Features

### Authentication

* User Registration
* User Login
* Refresh Access Token
* User Logout
* Password Hashing using bcryptjs
* JWT Access Token Authentication
* JWT Refresh Token Authentication

### User Management

* View Own Profile
* Update Own Profile
* View All Users (Admin Only)
* Change User Roles (Admin Only)

### Project Management

* Create Project
* View Projects
* Update Projects
* Delete Projects

### Security

* Password Hashing
* JWT Verification Middleware
* Input Validation using Zod
* Rate Limiting
* Helmet Security Headers
* Environment Variables
* Centralized Error Handling

---

## Roles & Permissions

| Role    | Permissions                                                                      |
| ------- | -------------------------------------------------------------------------------- |
| USER    | View own profile, Update own profile, View projects                              |
| MANAGER | Everything USER can do + Create projects + Update own projects                   |
| ADMIN   | Everything MANAGER can do + Delete projects + View all users + Change user roles |

---

## Folder Structure

```text
project-root
│
├── config
├── controllers
├── middlewares
├── models
├── routes
├── services
├── utils
├── validators
│
├── server.js
├── package.json
├── .env.example
└── README.md
```

---

## Environment Variables

Create a `.env` file and add the following:

```env
PORT=3000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_ACCESS_SECRET=your_access_token_secret

JWT_REFRESH_SECRET=your_refresh_token_secret
```

---

## Installation & Setup

### Clone Repository

```bash
git clone https://github.com/sahilnikalje/farminsta-assignment.git
```

### Navigate to Project

```bash
cd farminsta-assignment
```

### Install Dependencies

```bash
npm install
```

### Create Environment File

Create a `.env` file and add the required environment variables.

### Start Development Server

```bash
npm run dev
```

### Start Production Server

```bash
npm start
```

---

## Server Configuration

Default Port:

```text
3000
```

Base URL:

```text
http://localhost:3000
```

API Version:

```text
/api/v1
```

---

## API Endpoints

### Authentication

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | /api/v1/auth/register | Register a new user       |
| POST   | /api/v1/auth/login    | Login user                |
| POST   | /api/v1/auth/refresh  | Generate new access token |
| POST   | /api/v1/auth/logout   | Logout user               |

---

### Users

| Method | Endpoint               | Access             |
| ------ | ---------------------- | ------------------ |
| GET    | /api/v1/users/profile  | Authenticated User |
| PATCH  | /api/v1/users/profile  | Authenticated User |
| GET    | /api/v1/users          | ADMIN              |
| PATCH  | /api/v1/users/:id/role | ADMIN              |

---

### Projects

| Method | Endpoint             | Access                 |
| ------ | -------------------- | ---------------------- |
| GET    | /api/v1/projects     | USER, MANAGER, ADMIN   |
| POST   | /api/v1/projects     | MANAGER, ADMIN         |
| PUT    | /api/v1/projects/:id | Project Owner or ADMIN |
| DELETE | /api/v1/projects/:id | ADMIN                  |

---

## Swagger Documentation

Swagger UI is available at:

```text
https://farminsta-assignment.onrender.com/api-docs
```

The documentation includes:

* Request Schemas
* Response Schemas
* Authentication Requirements
* Endpoint Testing Interface

---

## Deployment

### Backend Hosting

* Render

### Database Hosting

* MongoDB Atlas

---

## Security Measures

* Password Hashing using bcryptjs
* JWT Authentication
* Refresh Token Validation
* Role-Based Access Control
* Input Validation using Zod
* Helmet Security Headers
* Rate Limiting
* Environment Variables
* Centralized Error Handling

---

## Author

**Sahil Nikalje**

GitHub: https://github.com/sahilnikalje

Repository: https://github.com/sahilnikalje/farminsta-assignment.git
