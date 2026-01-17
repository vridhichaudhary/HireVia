# HireVia

**HireVia** is a full-stack job aggregation and career intelligence platform. It provides a curated feed of engineering roles and utilizes Google's Gemini AI to offer resume analysis, job-resume matching, and automated cover letter generation.

**Live Demo:** [https://hire-via.vercel.app](https://hire-via.vercel.app)

---

## � Tech Stack

| Component | Technologies |
|-----------|--------------|
| **Frontend** | Next.js 15 (App Router), Tailwind CSS v4, Framer Motion |
| **Backend** | Node.js, Express.js, Passport.js (Google OAuth, JWT) |
| **Database** | MySQL, Prisma ORM |
| **AI** | Google Generative AI (Gemini 1.5 Flash) |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🚀 Key Features

*   **Job Marketplace**: Aggregated feed of high-performance engineering roles with filtering (Tech Stack, Seniority, Industry).
*   **AI Resume Analyzer**: Parses PDF resumes to provide a 0-100 score, strength identification, and actionable improvements.
*   **Smart Matching**: Compares resumes against specific Job Descriptions (JDs) to calculate compatibility and identify missing keywords (`Gap Analysis`).
*   **Cover Letter Generator**: Auto-generates tailored cover letters mapping user achievements to JD requirements.
*   **Application Tracker**: Kanban-style board to track applications from specific stages (Applied -> Offer).
*   **Authentication**: Secure Google OAuth 2.0 and Email/Password login with JWT sessions.

---

## ⚙️ Local Development Setup

### 1. Prerequisites
*   Node.js (v18+)
*   MySQL Database (Local or Cloud)
*   Google Cloud Project credentials (Client ID/Secret)
*   Google Gemini API Key

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/vridhichaudhary/HireVia.git
cd HireVia
```

### 3. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    npm install
    ```
2.  Create a `.env` file in `server/` with the following variables:
    ```env
    PORT=8080
    DATABASE_URL="mysql://user:password@localhost:3306/hirevia"
    JWT_SECRET="your_secure_random_string"
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    GEMINI_API_KEY="your_gemini_api_key"
    CLIENT_URL="http://localhost:3000"
    ```
3.  Sync the database schema:
    ```bash
    npx prisma db push
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```

### 4. Frontend Setup
1.  Open a new terminal and navigate to the root directory:
    ```bash
    cd .. # if in server directory
    npm install
    ```
2.  Create a `.env.local` file in the root directory:
    ```env
    NEXT_PUBLIC_API_URL="http://localhost:8080/api"
    ```
3.  Start the Next.js development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

*   **`src/app`**: Frontend pages (Next.js App Router).
*   **`server/controllers`**: logic for Auth, Jobs, and AI endpoints.
*   **`server/prisma`**: Database schema (`schema.prisma`).
*   **`server/services`**: Integrations with Google Gemini API.
*   **`server/routes`**: API route definitions.

---

