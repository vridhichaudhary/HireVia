# HireVia – AI-Driven Job Aggregation & Career Optimization Platform

## Project Overview
HireVia is a full-stack job aggregation and career development platform that helps job seekers discover relevant opportunities, track applications, and optimize their resumes using Generative AI. The platform combines structured job search, application pipeline management, and AI-powered resume analysis to improve candidate visibility and ATS compatibility.

---

## Problem Statement
Job seekers often rely on fragmented tools such as spreadsheets, job portals, and manual resume edits to manage applications. This leads to poor tracking, inconsistent resumes, and low ATS pass rates. HireVia centralizes job discovery, application tracking, and AI-based career optimization into a single, scalable platform.

---

## System Architecture

### Architecture Flow
Frontend (Next.js App Router) → Backend (Express.js REST APIs) → Database (MySQL via Prisma) → AI Services (Google Gemini)

---

## Technology Stack

### Frontend
- Next.js 15 (App Router)
- React
- Tailwind CSS v4
- Framer Motion (UI animations)
- React Icons
- Axios / Fetch API
- React Context API (AuthContext)

### Backend
- Node.js
- Express.js
- RESTful API architecture
- Prisma ORM
- MySQL database
- Passport.js (Google OAuth 2.0)
- JWT (JSON Web Tokens)
- bcrypt.js (password hashing)
- multer (file uploads)
- pdf-parse (resume text extraction)

### AI & External Services
- Google Generative AI (Gemini 1.5 Flash)
- Structured prompt engineering with deterministic JSON outputs

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MySQL (hosted)

---

## Key Features

### 🔍 Job Search & Aggregation
- Aggregated job listings with company, location, salary, and tech stack
- Advanced filtering by industry, seniority, and skills
- Keyword-based search for titles and companies
- Server-side pagination for scalable data loading

### 🤖 AI Career Optimization Hub

#### 1. Resume Analyzer
- Upload resume (PDF)
- Extracts text using `pdf-parse`
- AI-generated outputs:
  - Resume score (0–100)
  - Key strengths (3–5)
  - Actionable improvement suggestions
  - Professional executive summary

#### 2. JD–Resume Smart Matcher
- Compares resume with job description
- Outputs:
  - ATS match percentage
  - Keyword gap analysis (missing vs present skills)
  - Strategy recommendation to improve match score

#### 3. Cover Letter Generator
- Generates tailored cover letters
- Maps real resume achievements to JD requirements
- Enforces professional, recruiter-friendly tone
- Produces ready-to-send content

### 📊 Application Tracker
- Track applications across stages:
  - Applied
  - Interviewing
  - Offered
  - Rejected
- One-click job tracking
- Visual pipeline management

### 🔐 Authentication & User Management
- Google OAuth 2.0 login
- Email/password authentication
- JWT-based stateless sessions
- Protected routes and role-based access

---

## How It Works

### Authentication Flow
1. User logs in via Google OAuth or email/password
2. Backend validates credentials
3. JWT issued and stored client-side
4. JWT used for authenticated API requests

### Job Aggregation Flow
1. Jobs stored in MySQL database
2. Frontend sends filter and search parameters
3. Prisma translates queries into optimized SQL
4. Paginated results returned to UI

### AI Processing Flow
1. User uploads resume (PDF)
2. Backend extracts text using `pdf-parse`
3. Structured prompt sent to Gemini API
4. AI returns deterministic JSON output
5. Frontend renders insights and recommendations

---

## API Overview

All APIs are prefixed with `/api`

### Authentication
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/auth/signup` | POST | Register user |
| `/api/auth/login` | POST | Login user |
| `/api/auth/google` | GET | Google OAuth |

### Jobs
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/jobs` | GET | Fetch jobs with filters |
| `/api/jobs/:id` | GET | Get job details |

### Applications
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/applications` | POST | Track a job |
| `/api/applications` | GET | Get tracked jobs |
| `/api/applications/:id` | PUT | Update application status |

### AI Services
| Endpoint | Method | Description |
|--------|--------|-------------|
| `/api/ai/resume-analyze` | POST | Resume analysis |
| `/api/ai/match-jd` | POST | JD–Resume matching |
| `/api/ai/cover-letter` | POST | Generate cover letter |

---


## How to Run Locally

### Prerequisites
- Node.js v18+
- MySQL database

### Installation
```bash
git clone https://github.com/your-username/hirevia.git
cd hirevia
npm install

Environment Variables

Create a .env file:

DATABASE_URL=mysql://user:password@host:port/db
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GEMINI_API_KEY=your_gemini_api_key

Database Setup
npx prisma generate
npx prisma migrate dev

Run Development Servers
# Frontend
npm run dev

# Backend
npm run server


Open http://localhost:3000
