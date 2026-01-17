HireVia

AI-Powered Job Aggregation & Career Acceleration Platform

HireVia is a high-performance job aggregation and career acceleration platform built for engineers.
It combines real job discovery, application tracking, and a Generative-AI powered AI Hub that analyzes resumes, matches them against job descriptions, and generates tailored cover letters using Google Gemini 1.5.

The platform is designed to solve three real problems engineers face:

Finding relevant, high-quality job roles

Getting past ATS filters

Presenting their experience clearly and professionally

✨ Core Features
🔍 Job Aggregation & Discovery

Aggregates curated job postings stored in a relational database

Advanced filtering by:
Industry
Seniority
Tech stack
Company
Paginated, optimized queries for performance

📊 Application Tracker

One-click Quick Track / Apply

Track applications across stages:

APPLIED
INTERVIEWING
OFFERED
REJECTED

Clean, visual tracker UI for progress monitoring

🧠 AI Hub (Key Differentiator)
1️⃣ Resume Analyzer

Simulates a FAANG-level recruiter review

Extracts text from uploaded PDF resumes

Evaluates:

Technical depth

Impact & metrics

Clarity of experience

Outputs:

Resume Score (0–100)

Strengths (3–5)

Critical improvement suggestions

2️⃣ JD–Resume Smart Matcher

Solves the ATS black-hole problem

Compares resume vs job description

Detects missing keywords and skills

Returns:

Match percentage

Missing JD keywords

1-line actionable strategy

3️⃣ Automated Cover Letter Generator

Uses real resume content only (no hallucination)

Maps candidate experience directly to JD requirements

Enforces:

Professional, confident engineering tone

No generic AI fluff

Produces a ready-to-send cover letter

🏗️ System Architecture
High-Level Overview
Client (Next.js)
   ↓ JWT
Backend (Node + Express)
   ↓ Prisma ORM
MySQL Database
   ↓
Google Gemini 1.5 API

🧑‍💻 Tech Stack
Frontend

Next.js 15 (App Router) – SSR, routing, and performance

Tailwind CSS v4 – Utility-first responsive styling

Framer Motion – Smooth animations and transitions

React Context API – Auth & session state

React Icons – UI iconography

Backend

Node.js + Express.js – REST API

MySQL – Relational data storage

Prisma ORM – Type-safe DB access

Authentication

Passport.js (Google OAuth 2.0)

JWT (stateless auth)

bcrypt.js (password hashing)

File Processing

multer – File uploads

pdf-parse – Resume text extraction

AI & Services

Google Generative AI

Gemini 1.5 Flash / Pro

Deployment

Frontend: Vercel

Backend: Render

🧠 AI Hub – Internal Workflow
Resume Analyzer Flow
PDF Upload
 → pdf-parse (text extraction)
 → Prompt Engineering (strict system prompt)
 → Gemini Analysis
 → Structured JSON response

JD–Resume Matcher Flow
Resume Text + JD Text
 → Comparative Prompt
 → Keyword Gap Analysis
 → Match Score + Strategy

Cover Letter Generator Flow
Resume Experience + JD Requirements
 → Controlled Prompt (no hallucination)
 → Structured Narrative Output

🔐 Authentication Flow
Google OAuth

User clicks Continue with Google

Redirect to Google consent screen

Google returns access token

Backend:

Validates token

Creates / updates user in MySQL

Issues JWT

JWT stored in localStorage and attached to API requests

📂 Project Structure
hirevia/
├── client/                 # Next.js frontend
│   ├── app/
│   ├── components/
│   ├── context/
│   └── styles/
│
├── server/                 # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── prisma/
│   └── utils/
│
├── prisma/
│   └── schema.prisma
│
└── README.md

🚀 Getting Started
Prerequisites

Node.js ≥ 18

MySQL

Google OAuth credentials

Google Generative AI API key

Environment Variables
Backend (server/.env)
DATABASE_URL=mysql://user:password@localhost:3306/hirevia
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key

Frontend (client/.env)
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

Install & Run
Backend
cd server
npm install
npx prisma migrate dev
npm run dev

Frontend
cd client
npm install
npm run dev
