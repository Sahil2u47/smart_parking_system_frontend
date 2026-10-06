## 🔐 Authentication Flow

<p align="center">
  <img src="docs/auth-flow.svg" alt="Authentication Flow" width="100%"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" alt="Spring Security"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
</p>

### How it works

| Step | What happens | Where |
|:---:|---|---|
| **1** | User enters email and password | React `Login` page |
| **2** | Credentials are sent to `POST /auth/login` | `authService` |
| **3** | Request passes through the Spring Security filter chain | Spring Security |
| **4** | `AuthenticationManager` verifies the credentials | Backend |
| **5** | User is authenticated | `CustomUserDetailsService` |
| **6** | A signed JWT (containing the role) is generated | Backend |
| **7** | Frontend receives and stores the token | `useAuth` context |
| **8** | Token is sent as `Authorization: Bearer <token>` on protected requests | `JwtAuthenticationFilter` validates it |

### Sequence diagram

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
    S->>J: Generate token (email + role)
    J-->>F: JWT Token
    F->>F: Store token
    F->>S: Protected request + Bearer token
    S->>S: JwtAuthenticationFilter validates token
    S-->>F: Protected data
```

### Role-based redirect

| Role | Redirect after login |
|---|---|
| `ADMIN` | `/admin/dashboard` |
| `USER` | `/dashboard` |
