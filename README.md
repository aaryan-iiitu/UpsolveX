# UpsolveX - Competitive Programming Analytics Platform

A platform for competitive programmers to analyze contests, practice problems, and improve skills using recommendation systems and spaced repetition.

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Docker & Docker Compose (optional)

### Installation

1. **Clone and Setup**
```bash
cd UpsolveX
npm install
```

2. **Environment Setup**
```bash
# Frontend
cp frontend/.env.example frontend/.env.local

# Backend
cp backend/.env.example backend/.env
```

3. **Database Setup**
```bash
# Using Docker Compose (recommended)
docker-compose -f docker/docker-compose.yml up -d

# Or manually
createdb upsolve_x_db
cd backend && npm run prisma:migrate
```

4. **Start Development Servers**
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` for the frontend and `http://localhost:3001` for the API.

##  Project Structure

```
UpsolveX/
├── frontend/                 # Next.js 15 App Router
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # React components
│   │   │   ├── layout/      # Layout components
│   │   │   ├── ui/          # Reusable UI components
│   │   │   └── dashboard/   # Dashboard components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── lib/             # Utilities and helpers
│   │   ├── types/           # TypeScript types
│   │   └── contexts/        # React contexts
│   └── public/              # Static assets
│
├── backend/                  # Express.js API
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── utils/           # Utilities
│   │   ├── types/           # TypeScript types
│   │   ├── constants/       # Constants
│   │   ├── config/          # Configuration
│   │   └── index.ts         # Server entry point
│   └── logs/                # Application logs
│
├── prisma/                   # Prisma ORM
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
│
├── docker/                   # Docker configuration
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   ├── docker-compose.yml
│   └── .env.example
│
└── shared/                   # Shared types/utilities
```

##  Architecture

### Frontend Architecture
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS + Shadcn UI
- **State Management**: Zustand (recommended)
- **Data Fetching**: Axios with custom API client
- **Authentication**: Supabase Auth + Google OAuth
- **Charts**: Recharts for analytics visualization

### Backend Architecture
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **API**: RESTful API with proper separation of concerns
- **Error Handling**: Centralized error handling middleware
- **Logging**: Winston logger
- **Validation**: Zod for schema validation

### Database Schema
- **Users**: User profiles and authentication
- **Contests**: Contest history and statistics
- **Problems**: Problem tracking and progress
- **Submissions**: Detailed submission logs
- **Recommendations**: AI-powered learning recommendations
- **Analytics**: User performance analytics

##  API Documentation

### User Endpoints
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/preferences` - Get preferences
- `PUT /api/users/preferences` - Update preferences

### Contest Endpoints
- `GET /api/contests` - Get user contests (paginated)
- `GET /api/contests/:contestId` - Get contest details
- `POST /api/contests` - Create new contest
- `GET /api/contests/:contestId/analyze` - Analyze contest

### Problem Endpoints
- `GET /api/problems` - Get problems (paginated)
- `GET /api/problems/:problemId` - Get problem details
- `POST /api/problems` - Create problem
- `PUT /api/problems/:problemId/progress` - Update progress
- `GET /api/problems/solved` - Get solved problems
- `GET /api/problems/difficulty/:difficulty` - Get by difficulty

##  Development

### Available Scripts

**Frontend:**
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

**Backend:**
```bash
npm run dev              # Start dev server with hot reload
npm run build           # Build TypeScript
npm run start           # Run production build
npm run lint            # Run ESLint
npm run type-check      # TypeScript check
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run migrations
npm run prisma:studio   # Open Prisma Studio
```

##  Docker

### Run with Docker Compose
```bash
cd docker
cp .env.example .env
docker-compose up -d
```

This starts:
- PostgreSQL database
- Redis cache
- Backend API (port 3001)
- Frontend (port 3000)

##  Database Migrations

### Create a new migration
```bash
cd backend
npm run prisma:migrate -- --name migration_name
```

### View database in Prisma Studio
```bash
cd backend
npm run prisma:studio
```

##  Environment Variables

See `.env.example` files in `frontend/`, `backend/`, and `docker/` directories.

**Key variables:**
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_SERVICE_KEY`: Supabase service role key
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT tokens
- `FRONTEND_URL`: Frontend application URL

##  Testing (Future)

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

##  Performance & Optimization

- **Frontend**: Image optimization with Next.js Image
- **Backend**: Request/response compression
- **Database**: Query optimization with Prisma
- **Caching**: Redis for session management
- **API**: Rate limiting middleware

##  Deployment

### Frontend (Vercel recommended)
```bash
cd frontend
npm run build
vercel deploy
```

### Backend (Heroku/Railway recommended)
```bash
cd backend
npm run build
# Deploy using platform-specific CLI
```

### Database
Use managed PostgreSQL services (AWS RDS, DigitalOcean, Supabase)

##  Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

##  Code Style

- ESLint for linting
- Prettier for code formatting
- TypeScript for type safety
- Consistent naming conventions


