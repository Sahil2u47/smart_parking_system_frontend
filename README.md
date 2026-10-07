<div align="center">

<h1>🚗 Smart Parking System</h1>

<p><b>Park Smarter. Live Better.</b></p>

<p>
A modern full-stack parking management platform built with <b>Spring Boot</b>, <b>React</b>, <b>MySQL</b> and <b>JWT authentication</b>.
</p>

<p>
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p>
  <a href="#-overview">Overview</a> •
  <a href="#%EF%B8%8F-system-architecture">Architecture</a> •
  <a href="#-authentication--authorization">Security</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#%EF%B8%8F-getting-started">Getting Started</a>
</p>

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Objectives](#-objectives)
- [Tech Stack](#%EF%B8%8F-tech-stack)
- [System Architecture](#%EF%B8%8F-system-architecture)
- [Authentication & Authorization](#-authentication--authorization)
- [Features](#-features)
- [Admin Control Center](#-admin-control-center)
- [API Architecture](#-api-architecture)
- [API Endpoints](#-api-endpoints)
- [Parking Pricing](#-parking-pricing)
- [Project Structure](#-project-structure)
- [Getting Started](#%EF%B8%8F-getting-started)
- [Application Flow](#-application-flow)
- [Security](#%EF%B8%8F-security)
- [Screenshots](#-screenshots)
- [Key Learnings](#-key-learnings)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## ✨ Overview

The application helps users find available parking slots, manage vehicles, book parking spaces, complete parking sessions and track parking activity. An **Admin Control Center** allows administrators to manage parking capacity and monitor slot availability.

| 👤 For Users | 🛠️ For Admins |
|---|---|
| Manage vehicles | Create and manage parking slots |
| View available parking slots | Monitor total parking capacity |
| Book parking slots | Monitor available and occupied slots |
| Exit and complete parking sessions | View distribution by vehicle type |
| View booking history | Monitor current slot status |
| Cancel eligible bookings | Protected by role-based authorization |

---

## 🎯 Objectives

- ⏱️ Reduce the time required to find parking
- 🅿️ Provide up-to-date parking slot availability
- 📅 Simplify parking slot booking
- 🚘 Centralize vehicle and booking management
- 🔐 Provide secure authentication and authorization
- 📊 Give administrators better visibility into parking capacity
- 🚫 Prevent unauthorized access to protected operations

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | Core programming language |
| ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) | Backend application framework |
| ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white) | Authentication & authorization |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Stateless authentication |
| Spring Data JPA | Database interaction |
| Hibernate | ORM |
| REST APIs | Frontend-backend communication |
| Bean Validation | Request validation |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) | Relational database |
| BCrypt | Password encryption |

### Frontend

| Technology | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | User interface |
| React Router | Client-side routing |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Application logic |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling |
| Fetch API | REST API communication |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Frontend build tool |

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    A["⚛️ React.js Frontend"] -->|"REST API + JWT"| B["🍃 Spring Boot Backend"]
    B --> C["Controllers"]
    B --> D["Services"]
    B --> E["Security"]
    C --> F["Spring Data JPA / Hibernate"]
    D --> F
    E --> F
    F --> G[("🗄️ MySQL")]
```

---

## 🔐 Authentication & Authorization

The application implements **JWT-based authentication** with **role-based authorization**.

### Authentication Flow

<p align="center">
  <img src="docs/auth-flow.svg" alt="Authentication Flow" width="100%"/>
</p>

```mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant F as React Frontend
    participant S as Spring Security
    participant A as AuthenticationManager
    participant J as JWT Service

    U->>F: Enter email & password
    F->>S: POST /auth/login
    S->>A: authenticate(credentials)
    A-->>S: Authentication successful
    S->>J: Generate token
    J-->>F: JWT Token
    F->>F: Store token
    F->>S: Protected request + Bearer token
    S->>S: Validate token (filter chain)
    S-->>F: Protected data
```

### Roles

| Role | Capabilities |
|---|---|
| 👤 **USER** | Register and login, manage vehicles, view parking slots, book parking, exit parking, view booking history, cancel eligible bookings |
| 🛠️ **ADMIN** | Access the Admin Control Center, create parking slots, monitor total / available / occupied slots, view distribution by vehicle type, monitor current slot status |

---

## 🚘 Features

### 🔑 Authentication

- User registration
- Secure login
- JWT authentication
- BCrypt password encryption
- Role-based authorization

### 🚗 Vehicle Management

| Vehicle Type | Icon |
|---|:---:|
| Car | 🚗 |
| Bike | 🏍️ |
| Auto | 🛺 |

Vehicle information includes: **vehicle number**, **vehicle type**, **brand** and **color**.

### 🅿️ Parking Availability

Users can view the latest parking slot information. Each slot contains the **slot number**, **vehicle type** and **current status**.

### 📅 Parking Booking

Users can book parking using their registered vehicle information.

```mermaid
flowchart LR
    A["Select Vehicle"] --> B["Select Parking Slot"] --> C["Create Booking"] --> D["Parking Session Active"]
```

### 🚪 Parking Exit

Users can complete their active parking session. The system calculates the **parking duration**, **total hours**, **total amount** and **booking status**.

### 📋 Booking History

Users can view their parking activity with pagination, including booking ID, entry time, exit time, total hours, total amount and booking status.

### ❌ Booking Cancellation

Users can cancel eligible parking bookings before completing the parking session.

```mermaid
stateDiagram-v2
    [*] --> Active: Book parking
    Active --> Completed: Exit parking
    Active --> Cancelled: Cancel booking
    Completed --> [*]
    Cancelled --> [*]
```

---

## 📊 Admin Control Center

The application provides a dedicated dashboard for administrators.

### Dashboard Metrics

| 📦 Total Parking Slots | 🟢 Available Slots | 🔴 Occupied Slots | 📈 Current Occupancy |
|:---:|:---:|:---:|:---:|

### Vehicle-Type Breakdown

| Type | Total Slots | Available | Occupied |
|---|:---:|:---:|:---:|
| 🚗 Cars | ✔ | ✔ | ✔ |
| 🏍️ Bikes | ✔ | ✔ | ✔ |
| 🛺 Autos | ✔ | ✔ | ✔ |

### Parking Slot Management

Administrators can create parking slots by specifying the **slot number** and **slot type**.

```json
{
  "slotNumber": "B01",
  "slotType": "BIKE"
}
```

---

## 🔄 API Architecture

```mermaid
flowchart LR
    A["React Component"] --> B["Frontend Service Layer"] --> C["Fetch API"] --> D["REST Controller"] --> E["Service Layer"] --> F["Repository"] --> G[("MySQL")]
```

For protected APIs:

```mermaid
flowchart LR
    A["React"] --> B["JWT Authorization Header"] --> C["Spring Security Filter Chain"] --> D["Authentication"] --> E["Authorization"] --> F["Controller"]
```

---

## 📡 API Endpoints

<details open>
<summary><b>🔑 Authentication</b></summary>

| Method | Endpoint | Description |
|:---:|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Login and receive JWT |

</details>

<details open>
<summary><b>🚗 Vehicle</b></summary>

| Method | Endpoint | Description |
|:---:|---|---|
| `POST` | `/vehicle/saveVehicle` | Save a vehicle |
| `GET` | `/vehicle/my-vehicles` | Get logged-in user's vehicles |

</details>

<details open>
<summary><b>🅿️ Parking Slot</b></summary>

| Method | Endpoint | Description |
|:---:|---|---|
| `POST` | `/parkingslot/register` | Create a parking slot (Admin) |
| `GET` | `/parkingslot` | Get all parking slots |

</details>

<details open>
<summary><b>📅 Booking</b></summary>

| Method | Endpoint | Description |
|:---:|---|---|
| `POST` | `/booking/book` | Book parking |
| `PUT` | `/booking/exit` | Exit parking |
| `GET` | `/booking/my-bookings` | Get booking history |
| `PUT` | `/booking/cancel` | Cancel a booking |

</details>

Protected requests use:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## 💰 Parking Pricing

| Vehicle Type | Price |
|---|---:|
| 🏍️ Bike | **₹20** / hour |
| 🛺 Auto | **₹30** / hour |
| 🚗 Car | **₹50** / hour |

---

## 🧩 Project Structure

<table>
<tr>
<td valign="top">

**Backend**

```
src/
└── main/
    └── java/
        └── com.sahil.smart_parking_project/
            ├── controller/
            ├── service/
            ├── repository/
            ├── entity/
            ├── dto/
            ├── mapper/
            ├── security/
            └── utils/
```

</td>
<td valign="top">

**Frontend**

```
src/
├── assets/
├── components/
├── context/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
└── App.jsx
```

</td>
</tr>
</table>

---

## ▶️ Getting Started

### Prerequisites

- ☕ Java 21+
- 📦 Maven
- 🗄️ MySQL
- 🟢 Node.js and npm
- 💻 IntelliJ IDEA / Eclipse / STS

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Sahil2u47/smart_parking_system.git
cd smart_parking_system
```

### 2️⃣ Backend Setup

Create the MySQL database:

```sql
CREATE DATABASE smart_parkingdb;
```

Configure your MySQL credentials in the backend `application.properties`, then run the Spring Boot application.

```
Backend  →  http://localhost:8182
```

### 3️⃣ Frontend Setup

```bash
cd smart-parking-frontend
npm install
npm run dev
```

```
Frontend  →  http://localhost:5173
```

### ⚙️ Environment Configuration

Create a `.env` file inside the frontend project:

```env
VITE_API_BASE_URL=http://localhost:8182
```

---

## 🧪 Application Flow

### 👤 User Flow

```mermaid
flowchart LR
    A["Signup"] --> B["Login"] --> C["JWT Authentication"] --> D["User Dashboard"] --> E["Register Vehicle"] --> F["View Parking Slots"] --> G["Book Parking"] --> H["Active Parking"] --> I["Exit Parking"] --> J["Booking History"]
```

### 🛠️ Admin Flow

```mermaid
flowchart LR
    A["Admin Login"] --> B["Admin Control Center"] --> C["Create Parking Slots"] --> D["Monitor Parking Capacity"] --> E["Monitor Available / Occupied Slots"] --> F["Monitor Vehicle-Type Distribution"]
```

---

## 🛡️ Security

| Protection | Description |
|---|---|
| 🔐 Spring Security | Secures the REST API |
| 🎟️ JWT authentication | Stateless token-based authentication |
| 🔑 BCrypt | Password hashing |
| 👥 Role-based authorization | `USER` and `ADMIN` permissions |
| 🚧 Protected REST endpoints | Unauthorized requests are rejected |
| 🧭 Frontend route protection | Guarded routes in React Router |
| 📨 Authorization headers | `Authorization: Bearer <JWT_TOKEN>` |

---

## 📸 Screenshots

> Add your screenshots to `docs/screenshots/` and update the file names below.

| 🏠 Home Page | 🔑 Login Page |
|:---:|:---:|
| ![Home](docs/screenshots/home.png) | ![Login](docs/screenshots/login.png) |

| 📝 Signup Page | 📊 User Dashboard |
|:---:|:---:|
| ![Signup](docs/screenshots/signup.png) | ![Dashboard](docs/screenshots/dashboard.png) |

| 🅿️ Parking Availability | 🚗 Vehicle Management |
|:---:|:---:|
| ![Parking](docs/screenshots/parking.png) | ![Vehicles](docs/screenshots/vehicles.png) |

| 📅 Booking Page | 📋 Booking History |
|:---:|:---:|
| ![Booking](docs/screenshots/booking.png) | ![History](docs/screenshots/history.png) |

| 🛠️ Admin Control Center |
|:---:|
| ![Admin](docs/screenshots/admin-dashboard.png) |

---

## 📚 Key Learnings

- Designing RESTful APIs using Spring Boot
- Spring Security and JWT authentication
- Role-based authorization
- Spring Data JPA and Hibernate
- MySQL database integration
- DTO-based API design
- Request validation
- React component architecture
- React Router protected routes
- Frontend-backend API integration
- Authentication state management
- Parking and booking workflow design

---

## 🚀 Future Enhancements

- [ ] 💳 Online payment integration
- [ ] 📧 Email notifications
- [ ] 📱 Mobile application
- [ ] 📍 GPS-based parking discovery
- [ ] 🔔 Real-time booking notifications
- [ ] 📊 Advanced parking analytics
- [ ] ☁️ Cloud deployment
- [ ] 📈 Admin reporting and revenue analytics

---

## 👨‍💻 Author

<div align="center">

### **Sahid Anwar**

*Java Backend Developer | Spring Boot Developer*

Interested in building scalable backend systems, REST APIs, secure applications and real-world software solutions.

<p>
  <a href="https://github.com/Sahil2u47/"><img src="https://img.shields.io/badge/GitHub-Sahil2u47-181717?style=for-the-badge&logo=github" alt="GitHub"/></a>
  <a href="https://linkedin.com/in/sahid-anwar-955898280/"><img src="https://img.shields.io/badge/LinkedIn-Sahid%20Anwar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://leetcode.com/u/Sahil2u47/"><img src="https://img.shields.io/badge/LeetCode-Sahil2u47-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode"/></a>
</p>

</div>

---

<div align="center">

### ⭐ Support

If you find this project useful or interesting, consider giving it a ⭐ on GitHub.

<sub>Built with ❤️ using Spring Boot and React</sub>

</div>
