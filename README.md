<div align="center">

<br/>

# 🚗 Smart Parking System

### Park Smarter. Live Better.

<p>
A modern <b>full-stack</b> parking management platform — <b>Spring Boot</b> · <b>React</b> · <b>MySQL</b> · <b>JWT</b><br/>
Automatic slot allocation, role-based dashboards, dynamic pricing and real-time capacity insights.
</p>

<p>
  <img src="https://img.shields.io/badge/Java-21%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java"/>
  <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

<p>
  <img src="https://img.shields.io/badge/Architecture-Layered-0EA5E9?style=flat-square" alt="Layered"/>
  <img src="https://img.shields.io/badge/Auth-Stateless%20JWT-F59E0B?style=flat-square" alt="JWT"/>
  <img src="https://img.shields.io/badge/Access-RBAC-8B5CF6?style=flat-square" alt="RBAC"/>
  <img src="https://img.shields.io/badge/Concurrency-Pessimistic%20Lock-EF4444?style=flat-square" alt="Locking"/>
  <img src="https://img.shields.io/badge/Status-Active-22C55E?style=flat-square" alt="Status"/>
</p>

<p>
  <a href="#-overview"><b>Overview</b></a> &nbsp;•&nbsp;
  <a href="#-highlights"><b>Highlights</b></a> &nbsp;•&nbsp;
  <a href="#%EF%B8%8F-system-architecture"><b>Architecture</b></a> &nbsp;•&nbsp;
  <a href="#-authentication--authorization"><b>Security</b></a> &nbsp;•&nbsp;
  <a href="#-api-endpoints"><b>API</b></a> &nbsp;•&nbsp;
  <a href="#%EF%B8%8F-getting-started"><b>Get Started</b></a>
</p>

</div>

<br/>

---

<table align="center">
<tr>
<td align="center" width="20%"><h2>2</h2><sub>Roles<br/>USER · ADMIN</sub></td>
<td align="center" width="20%"><h2>3</h2><sub>Vehicle types<br/>CAR · BIKE · AUTO</sub></td>
<td align="center" width="20%"><h2>13</h2><sub>REST endpoints</sub></td>
<td align="center" width="20%"><h2>JWT</h2><sub>Stateless<br/>authentication</sub></td>
<td align="center" width="20%"><h2>0</h2><sub>Double-booked<br/>slots by design</sub></td>
</tr>
</table>

---

## 📑 Table of Contents

<details>
<summary><b>Click to expand</b></summary>

<br/>

1. [Overview](#-overview)
2. [Highlights](#-highlights)
3. [Objectives](#-objectives)
4. [Tech Stack](#%EF%B8%8F-tech-stack)
5. [System Architecture](#%EF%B8%8F-system-architecture)
6. [Authentication & Authorization](#-authentication--authorization)
7. [Features](#-features)
8. [Admin Control Center](#-admin-control-center)
9. [API Architecture](#-api-architecture)
10. [API Endpoints](#-api-endpoints)
11. [Parking Pricing](#-parking-pricing)
12. [Project Structure](#-project-structure)
13. [Getting Started](#%EF%B8%8F-getting-started)
14. [Application Flow](#-application-flow)
15. [Security](#%EF%B8%8F-security)
16. [Screenshots](#-screenshots)
17. [Key Learnings](#-key-learnings)
18. [Future Enhancements](#-future-enhancements)
19. [Author](#-author)

</details>

---

## ✨ Overview

> **Smart Parking System is more than a booking form.** It combines a secure Spring Boot backend with a React frontend so drivers can book parking in a few clicks while administrators keep full visibility of capacity and utilization.

<table>
<tr>
<td width="50%" valign="top">

### 👤 For Users
- 🚘 Manage vehicles
- 🅿️ View available parking slots
- 📅 Book parking in one step
- 🚪 Exit and complete parking sessions
- 📋 View booking history with pagination

</td>
<td width="50%" valign="top">

### 🛠️ For Admins
- ➕ Create and manage parking slots
- 📦 Monitor total parking capacity
- 🟢🔴 Track available and occupied slots
- 🚗🏍️🛺 View distribution by vehicle type
- 🛡️ Protected by role-based authorization

</td>
</tr>
</table>

---

## 🌟 Highlights

| | Capability | What makes it solid |
|:---:|---|---|
| 🔐 | **Secure by default** | Stateless JWT, BCrypt hashing, `USER` / `ADMIN` roles, guarded React routes |
| 🅿️ | **Automatic slot allocation** | Backend finds a free slot that matches the vehicle type — users never pick manually |
| ⚡ | **Concurrency safe** | `@Transactional` + `PESSIMISTIC_WRITE` locking so one slot is never assigned twice |
| 💰 | **Dynamic pricing** | Database-backed hourly rates with an occupancy-based surge multiplier locked at entry |
| 📊 | **Admin insights** | Live occupancy, vehicle-type breakdown and revenue analytics |
| 🧩 | **Clean API design** | DTOs + MapStruct, bean validation and centralized exception handling |
| ⚛️ | **Modern frontend** | React + Vite, React Router, context-based auth state and a service layer over Fetch API |

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

<table>
<tr>
<td width="50%" valign="top">

### ⚙️ Backend

| Technology | Purpose |
|---|---|
| ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | Core language |
| ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) | Application framework |
| ![Spring Security](https://img.shields.io/badge/Spring%20Security-6DB33F?style=flat-square&logo=springsecurity&logoColor=white) | AuthN & AuthZ |
| ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) | Stateless auth |
| Spring Data JPA · Hibernate | Persistence & ORM |
| MapStruct | DTO mapping |
| Bean Validation | Request validation |
| ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white) | Relational database |
| BCrypt | Password hashing |

</td>
<td width="50%" valign="top">

### 🎨 Frontend

| Technology | Purpose |
|---|---|
| ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | User interface |
| React Router | Routing & route guards |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Application logic |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling |
| Fetch API | REST communication |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tool |

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph FE["⚛️ Frontend · React + Vite"]
        direction LR
        P["Pages & Components"] --> CX["Auth Context"] --> SV["Service Layer · Fetch API"]
    end

    subgraph BE["🍃 Backend · Spring Boot"]
        direction LR
        SEC["🔐 Security Filter Chain"] --> CT["🎛️ Controllers"] --> SR["🧠 Services"] --> RP["🗃️ Repositories"]
    end

    DB[("🐬 MySQL")]

    SV -->|"REST + JWT Bearer"| SEC
    RP --> DB
```

---

## 🔐 Authentication & Authorization

JWT-based **authentication** with **role-based authorization**, enforced on both the API and the React routes.

### Login & token generation

```mermaid
sequenceDiagram
    autonumber
    actor U as User
    participant F as React Frontend
    participant AC as AuthController
    participant AM as AuthenticationManager
    participant US as CustomUserDetailsService
    participant JU as JwtUtils

    U->>F: Enter email and password
    F->>AC: POST /auth/login
    AC->>AM: authenticate(credentials)
    AM->>US: loadUserByUsername(email)
    US-->>AM: UserDetails + roles
    AM->>AM: Match password with BCrypt hash
    AM-->>AC: Authentication success
    AC->>JU: generateToken(user)
    JU-->>AC: Signed JWT
    AC-->>F: 200 OK + JWT
    F->>F: Store token in auth context
```

### Accessing a protected API

```mermaid
sequenceDiagram
    autonumber
    participant F as React Frontend
    participant JF as JwtAuthenticationFilter
    participant JU as JwtUtils
    participant SC as SecurityContext
    participant CT as Controller

    F->>JF: Request + Authorization: Bearer JWT
    JF->>JU: validateToken(jwt)
    alt Token invalid or expired
        JU-->>JF: Invalid
        JF-->>F: 401 Unauthorized
    else Token valid
        JU-->>JF: Valid + username
        JF->>SC: Set Authentication (user + roles)
        JF->>CT: Forward request
        alt Role not allowed
            CT-->>F: 403 Forbidden
        else Role allowed
            CT-->>F: 200 OK + Response DTO
        end
    end
```

### Role matrix

| Capability | 👤 USER | 🛠️ ADMIN |
|---|:---:|:---:|
| Register & login | ✅ | ✅ |
| Manage own vehicles | ✅ | — |
| View parking slots | ✅ | ✅ |
| Book parking | ✅ | — |
| Exit parking | ✅ | — |
| View own booking history | ✅ | — |
| Create parking slots | — | ✅ |
| Update parking rates | — | ✅ |
| Admin Control Center & analytics | — | ✅ |

---

## 🚘 Features

### 🔑 Authentication

- User registration & secure login
- JWT authentication
- BCrypt password encryption
- Role-based authorization

### 🚗 Vehicle Management

| Vehicle Type | Icon |
|---|:---:|
| Car | 🚗 |
| Bike | 🏍️ |
| Auto | 🛺 |

Vehicle information includes **vehicle number**, **vehicle type**, **brand** and **color**.

### 🅿️ Parking Availability

Users can view the latest parking slot information. Each slot shows its **slot number**, **vehicle type** and **current status**.

### 📅 Parking Booking

Users pick a registered vehicle and book. The backend **automatically allocates** a matching free slot under a database lock.

```mermaid
flowchart LR
    A["🚘 Select Vehicle"] --> B["🔒 Auto Slot Allocation"] --> C["📝 Create Booking"] --> D(["🟢 Parking Session Active"])
```

### 🚪 Parking Exit

Users complete their active session. The system calculates **duration**, **total hours** (minimum one hour), **total amount** and updates the **booking status**.

```mermaid
stateDiagram-v2
    [*] --> ACTIVE: Book parking
    ACTIVE --> COMPLETED: Exit parking
    COMPLETED --> [*]
```

### 📋 Booking History

Users can view their parking activity with pagination and sorting — booking ID, entry time, exit time, total hours, total amount and booking status.

---

## 📊 Admin Control Center

A dedicated dashboard for administrators.

### Dashboard metrics

<table align="center">
<tr>
<td align="center" width="25%"><h3>📦</h3><b>Total Slots</b><br/><sub>Overall capacity</sub></td>
<td align="center" width="25%"><h3>🟢</h3><b>Available</b><br/><sub>Ready to book</sub></td>
<td align="center" width="25%"><h3>🔴</h3><b>Occupied</b><br/><sub>Currently in use</sub></td>
<td align="center" width="25%"><h3>📈</h3><b>Occupancy</b><br/><sub>Current %</sub></td>
</tr>
</table>

### Vehicle-type breakdown

| Type | Total Slots | Available | Occupied |
|---|:---:|:---:|:---:|
| 🚗 Cars | ✔ | ✔ | ✔ |
| 🏍️ Bikes | ✔ | ✔ | ✔ |
| 🛺 Autos | ✔ | ✔ | ✔ |

### Parking slot management

Administrators create slots by specifying the **slot number** and **slot type**.

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
    A["⚛️ React Component"] --> B["🧰 Service Layer"] --> C["🌐 Fetch API"] --> D["🎛️ REST Controller"] --> E["🧠 Service"] --> F["🗃️ Repository"] --> G[("🐬 MySQL")]
```

Protected requests:

```mermaid
flowchart LR
    A["⚛️ React"] --> B["🎟️ JWT Header"] --> C["🔐 Security Filter Chain"] --> D["Authentication"] --> E["Authorization"] --> F["🎛️ Controller"]
```

---

## 📡 API Endpoints

Protected requests must include:

```http
Authorization: Bearer <JWT_TOKEN>
```

<details open>
<summary><b>🔑 Authentication</b></summary>

<br/>

| Method | Endpoint | Description | Access |
|:---:|---|---|:---:|
| ![POST](https://img.shields.io/badge/POST-22C55E?style=flat-square) | `/auth/register` | Register a new user | 🌍 Public |
| ![POST](https://img.shields.io/badge/POST-22C55E?style=flat-square) | `/auth/login` | Login and receive JWT | 🌍 Public |

</details>

<details open>
<summary><b>🚗 Vehicle</b></summary>

<br/>

| Method | Endpoint | Description | Access |
|:---:|---|---|:---:|
| ![POST](https://img.shields.io/badge/POST-22C55E?style=flat-square) | `/vehicle/saveVehicle` | Save a vehicle | 🔒 User |
| ![GET](https://img.shields.io/badge/GET-0EA5E9?style=flat-square) | `/vehicle/my-vehicles` | Get logged-in user's vehicles | 🔒 User |

</details>

<details open>
<summary><b>🅿️ Parking Slot</b></summary>

<br/>

| Method | Endpoint | Description | Access |
|:---:|---|---|:---:|
| ![POST](https://img.shields.io/badge/POST-22C55E?style=flat-square) | `/parkingslot/register` | Create a parking slot | 🛡️ Admin |
| ![GET](https://img.shields.io/badge/GET-0EA5E9?style=flat-square) | `/parkingslot` | Get all parking slots | 🔑 Authenticated |

</details>

<details open>
<summary><b>📅 Booking</b></summary>

<br/>

| Method | Endpoint | Description | Access |
|:---:|---|---|:---:|
| ![POST](https://img.shields.io/badge/POST-22C55E?style=flat-square) | `/booking/book` | Book parking | 🔒 User |
| ![PUT](https://img.shields.io/badge/PUT-F59E0B?style=flat-square) | `/booking/exit` | Exit parking | 🔒 User |
| ![GET](https://img.shields.io/badge/GET-0EA5E9?style=flat-square) | `/booking/my-bookings` | Get paginated booking history | 🔒 User |

```http
GET /booking/my-bookings?page=0&size=10&sort=startTime,desc
```

</details>

<details open>
<summary><b>💰 Rates & 📊 Analytics</b></summary>

<br/>

| Method | Endpoint | Description | Access |
|:---:|---|---|:---:|
| ![GET](https://img.shields.io/badge/GET-0EA5E9?style=flat-square) | `/parking-rates` | Get parking rates | 🔑 Authenticated |
| ![PUT](https://img.shields.io/badge/PUT-F59E0B?style=flat-square) | `/parking-rates/{vehicleType}` | Update a rate | 🛡️ Admin |
| ![GET](https://img.shields.io/badge/GET-0EA5E9?style=flat-square) | `/admin/parking/analytics` | Parking occupancy analytics | 🛡️ Admin |
| ![GET](https://img.shields.io/badge/GET-0EA5E9?style=flat-square) | `/admin/parking/booking-analytics` | Booking & revenue analytics | 🛡️ Admin |

</details>

<sub>🌍 Public &nbsp;·&nbsp; 🔑 Any authenticated user &nbsp;·&nbsp; 🔒 Role `USER` &nbsp;·&nbsp; 🛡️ Role `ADMIN`</sub>

---

## 💰 Parking Pricing

Rates are stored in the **database** and managed by admins — never hardcoded.

| Vehicle Type | Base Rate |
|---|---:|
| 🏍️ Bike | **₹20** / hour |
| 🛺 Auto | **₹30** / hour |
| 🚗 Car | **₹50** / hour |

> [!TIP]
> A **surge multiplier** is computed from current occupancy and **locked into the booking at entry**, so a driver is never charged more because the lot filled up after they arrived.

---

## 🧩 Project Structure

<table>
<tr>
<td valign="top" width="50%">

**⚙️ Backend**

```text
src/main/java/com.sahil.smart_parking_project/
├── controller/
├── service/
├── repository/
├── entity/
├── dto/
├── map_struct/
├── security/
├── globalException/
├── enums/
└── util/
```

</td>
<td valign="top" width="50%">

**🎨 Frontend**

```text
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

### ✅ Prerequisites

| Requirement | Version |
|---|---|
| ☕ Java | 21+ |
| 📦 Maven | Wrapper included |
| 🐬 MySQL | 8.x |
| 🟢 Node.js & npm | Latest LTS |
| 💻 IDE | IntelliJ IDEA / Eclipse / STS |

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Sahil2u47/smart_parking_system.git
cd smart_parking_system
```

### 2️⃣ Backend setup

Create the MySQL database:

```sql
CREATE DATABASE smart_parkingdb;
```

Set your environment variables, then run the Spring Boot application:

```env
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=your_long_secure_jwt_secret
```

```bash
./mvnw spring-boot:run        # Linux / macOS
mvnw.cmd spring-boot:run      # Windows
```

> 🟢 Backend → **http://localhost:8182**

### 3️⃣ Frontend setup

```bash
cd smart-parking-frontend
npm install
npm run dev
```

> 🟢 Frontend → **http://localhost:5173**

### ⚙️ Frontend environment

Create a `.env` file inside the frontend project:

```env
VITE_API_BASE_URL=http://localhost:8182
```

> [!WARNING]
> Never commit real credentials or your `JWT_SECRET`. Use a long, random secret in every environment.

---

## 🧪 Application Flow

### 👤 User journey

```mermaid
flowchart LR
    A["📝 Signup"] --> B["🔑 Login"] --> C["🎟️ JWT Auth"] --> D["📊 Dashboard"] --> E["🚘 Register Vehicle"] --> F["🅿️ View Slots"] --> G["📅 Book Parking"] --> H["🟢 Active Parking"] --> I["🚪 Exit Parking"] --> J["📋 History"]
```

### 🛠️ Admin journey

```mermaid
flowchart LR
    A["🔑 Admin Login"] --> B["🛠️ Control Center"] --> C["➕ Create Slots"] --> D["📦 Monitor Capacity"] --> E["🟢🔴 Available / Occupied"] --> F["🚗🏍️🛺 Type Distribution"]
```

---

## 🛡️ Security

| Protection | Description |
|---|---|
| 🔐 **Spring Security** | Secures the REST API |
| 🎟️ **JWT authentication** | Stateless token-based sessions |
| 🔑 **BCrypt** | Password hashing |
| 👥 **Role-based authorization** | `USER` and `ADMIN` permissions via `@PreAuthorize` |
| 🚧 **Protected endpoints** | Unauthorized requests are rejected (`401` / `403`) |
| 🧭 **Route protection** | Guarded routes in React Router |
| 📨 **Authorization header** | `Authorization: Bearer <JWT_TOKEN>` |
| ⚡ **Concurrency control** | `PESSIMISTIC_WRITE` locking on slot allocation |

---

## 📸 Screenshots

> Add your screenshots to `docs/screenshots/` and keep the file names below.

<table>
<tr>
<td align="center" width="50%"><b>🏠 Home</b><br/><img src="docs/screenshots/home.png" alt="Home"/></td>
<td align="center" width="50%"><b>🔑 Login</b><br/><img src="docs/screenshots/login.png" alt="Login"/></td>
</tr>
<tr>
<td align="center"><b>📝 Signup</b><br/><img src="docs/screenshots/signup.png" alt="Signup"/></td>
<td align="center"><b>📊 User Dashboard</b><br/><img src="docs/screenshots/dashboard.png" alt="Dashboard"/></td>
</tr>
<tr>
<td align="center"><b>🅿️ Parking Availability</b><br/><img src="docs/screenshots/parking.png" alt="Parking"/></td>
<td align="center"><b>🚗 Vehicle Management</b><br/><img src="docs/screenshots/vehicles.png" alt="Vehicles"/></td>
</tr>
<tr>
<td align="center"><b>📅 Booking</b><br/><img src="docs/screenshots/booking.png" alt="Booking"/></td>
<td align="center"><b>📋 Booking History</b><br/><img src="docs/screenshots/history.png" alt="History"/></td>
</tr>
<tr>
<td align="center" colspan="2"><b>🛠️ Admin Control Center</b><br/><img src="docs/screenshots/admin-dashboard.png" alt="Admin Dashboard"/></td>
</tr>
</table>

---

## 📚 Key Learnings

<table>
<tr>
<td width="50%" valign="top">

**⚙️ Backend**
- Designing RESTful APIs with Spring Boot
- Spring Security + JWT authentication
- Role-based authorization
- Spring Data JPA & Hibernate relationships
- Transactions and pessimistic locking
- DTO-based API design with MapStruct
- Request validation & global exception handling

</td>
<td width="50%" valign="top">

**🎨 Frontend**
- React component architecture
- React Router protected routes
- Frontend–backend API integration
- Authentication state management
- Service-layer pattern over Fetch API
- Parking & booking workflow design

</td>
</tr>
</table>

---

## 🚀 Future Enhancements

- [ ] 💳 Online payment integration
- [ ] 📧 Email / SMS notifications
- [ ] 🔔 Real-time booking notifications
- [ ] 📍 GPS-based parking discovery
- [ ] 📱 Mobile application

---

## 👨‍💻 Author

<div align="center">

### **Sahid Anwar**

*Java Backend Developer · Spring Boot Developer*

Building scalable backend systems, secure REST APIs and real-world software solutions.

<p>
  <a href="https://github.com/Sahil2u47/"><img src="https://img.shields.io/badge/GitHub-Sahil2u47-181717?style=for-the-badge&logo=github" alt="GitHub"/></a>
  <a href="https://linkedin.com/in/sahid-anwar-955898280/"><img src="https://img.shields.io/badge/LinkedIn-Sahid%20Anwar-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
  <a href="https://leetcode.com/u/Sahil2u47/"><img src="https://img.shields.io/badge/LeetCode-Sahil2u47-FFA116?style=for-the-badge&logo=leetcode&logoColor=black" alt="LeetCode"/></a>
</p>

</div>

---

<div align="center">

### 🚗 Smart Parking System — **Find. Book. Park.**

⭐ If you find this project useful or interesting, consider giving it a star on GitHub.

<sub>Built with ☕ Java, ⚛️ React and a lot of debugging.</sub>

</div>
