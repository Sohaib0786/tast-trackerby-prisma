# TaskFlow — Full-Stack Task Manager

A full-stack task management app with a **Node.js + TypeScript + Prisma** backend and a **Next.js** frontend.

---

## Project Structure

```
task-app/
├── backend/         # Node.js + Express + TypeScript + Prisma (SQLite)
└── frontend/        # Next.js 14 (App Router) + TypeScript + Tailwind
```

---

## Backend Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

The `.env` file is already included with development defaults. For production, change secrets:

```env
DATABASE_URL="file:./dev.db"
JWT_ACCESS_SECRET="change-me-in-production"
JWT_REFRESH_SECRET="change-me-in-production"
PORT=4000
FRONTEND_URL="http://localhost:3000"
```

### 3. Initialize the database

```bash
npx prisma generate
npx prisma db push
```

### 4. Run in development

```bash
npm run dev
```

The API will run at **http://localhost:4000**

---

## Frontend Setup

### 1. Install dependencies

```bash
cd frontend
npm install
```

### 2. Configure environment

`.env.local` is already included:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Run in development

```bash
npm run dev
```

The app will run at **http://localhost:3000**

---

## API Endpoints

### Auth

| Method | Endpoint         | Description                         | Auth Required |
|--------|------------------|-------------------------------------|---------------|
| POST   | /auth/register   | Register new user                   | No            |
| POST   | /auth/login      | Login and get tokens                | No            |
| POST   | /auth/refresh    | Refresh access token                | No            |
| POST   | /auth/logout     | Revoke refresh token                | No            |

### Tasks

| Method | Endpoint           | Description                                   | Auth Required |
|--------|--------------------|-----------------------------------------------|---------------|
| GET    | /tasks             | List tasks (pagination, filter, search)       | Yes           |
| POST   | /tasks             | Create a new task                             | Yes           |
| GET    | /tasks/:id         | Get single task                               | Yes           |
| PATCH  | /tasks/:id         | Update task                                   | Yes           |
| DELETE | /tasks/:id         | Delete task                                   | Yes           |
| POST   | /tasks/:id/toggle  | Toggle task status (pending ↔ completed)     | Yes           |

### GET /tasks Query Parameters

| Param  | Type   | Description                              |
|--------|--------|------------------------------------------|
| page   | number | Page number (default: 1)                 |
| limit  | number | Items per page (default: 10, max: 50)    |
| status | string | Filter: pending, in_progress, completed  |
| search | string | Search by task title                     |

### Example Request

```bash
# Register
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"password123"}'

# Get tasks
curl http://localhost:4000/tasks?page=1&limit=10&status=pending \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Architecture & Design Decisions

### Backend
- **Express** for routing; each domain (auth, tasks) is its own router module
- **Prisma** ORM with SQLite (easily swappable to PostgreSQL/MySQL by changing `provider` in schema)
- **JWT** tokens: 15-minute access tokens + 7-day refresh tokens with rotation (old refresh token deleted on use)
- **bcrypt** with cost factor 12 for password hashing
- **Zod** for runtime input validation
- Refresh tokens stored in DB for revocation support (logout truly invalidates the token)

### Frontend
- **Next.js App Router** with client components for interactive UI
- **Axios interceptors** handle token refresh automatically — 401 responses trigger a silent token refresh and retry the original request
- **AuthContext** provides global auth state; tokens stored in localStorage
- Debounced search input (400ms) to avoid flooding the API
- Toast notifications (react-hot-toast) for all operations
- Fully responsive dark UI using Tailwind CSS

### Security
- Passwords never stored in plain text
- Access tokens short-lived (15 min) to limit exposure
- Refresh token rotation — each refresh issues a new refresh token and invalidates the old one
- All task endpoints validate ownership (userId check) before any operation
- CORS restricted to frontend origin

---

## Database Schema

```prisma
model User {
  id            String         @id @default(cuid())
  email         String         @unique
  password      String         # bcrypt hash
  name          String
  tasks         Task[]
  refreshTokens RefreshToken[]
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  status      String   @default("pending")  # pending | in_progress | completed
  userId      String
  user        User     @relation(...)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model RefreshToken {
  id        String   @id @default(cuid())
  token     String   @unique
  userId    String
  expiresAt DateTime
}
```

---

## Production Deployment

1. Change `DATABASE_URL` to a production database (e.g., PostgreSQL)
2. Set strong random values for `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET`
3. Update `FRONTEND_URL` in backend and `NEXT_PUBLIC_API_URL` in frontend
4. Run `npm run build` in both directories
5. Use a process manager (PM2) or container (Docker) for the backend
6. Deploy the Next.js app to Vercel or any Node-compatible host
