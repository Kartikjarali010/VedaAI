# VedaAI – AI Assessment Creator

An AI-powered question paper generator for teachers. Create structured, multi-section question papers using Gemini AI with real-time generation updates.

## Architecture

```
Browser (Next.js) ──HTTP──► Express API ──► BullMQ Queue ──► Worker
                  ◄──WS────              ◄──────────────────────────
                                  MongoDB (assignments + results)
                                  Redis   (job state + queue)
                                  Gemini  (AI generation)
```

### Flow
1. Teacher fills the form (question types, marks, topic)
2. `POST /api/assignments` creates a MongoDB document and queues a BullMQ job
3. The worker picks up the job, calls Gemini 1.5 Flash with a structured prompt
4. Gemini returns JSON — parsed, validated, stored in MongoDB
5. Worker emits `generation:complete` via Socket.io to the assignment room
6. Frontend receives the event and renders the question paper instantly

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Zustand, Socket.io-client |
| Backend | Node.js, Express, TypeScript, Socket.io |
| Queue | BullMQ + Redis |
| Database | MongoDB (Mongoose) |
| AI | Google Gemini 1.5 Flash |

## Local Setup

### Prerequisites
- Node.js 18+
- Docker + Docker Compose

### 1. Start MongoDB + Redis
```bash
docker-compose up -d
```

### 2. Backend
```bash
cd backend
cp .env.example .env
# Edit .env — add your GEMINI_API_KEY
npm install
npm run dev
# Runs on http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

Open `http://localhost:3000` — it redirects to `/assignments`.

## Environment Variables

### Backend (`backend/.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vedaai
REDIS_HOST=localhost
REDIS_PORT=6379
GEMINI_API_KEY=your_key_here
CLIENT_URL=http://localhost:3000
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_WS_URL=http://localhost:5000
```

## Features

- **Assignment creation form** — file upload (optional), due date, question types with counts and marks
- **AI generation** — Gemini converts form input into a structured prompt, returns validated JSON
- **Real-time updates** — Socket.io WebSocket notifies the frontend the moment generation completes
- **Structured output** — sections (A, B, …), difficulty badges (Easy/Moderate/Hard), marks per question
- **PDF export** — html2canvas + jsPDF renders the question paper as a proper PDF
- **Regenerate** — one-click to create a new assignment
- **Delete** — remove assignments from the list
- **State management** — Zustand store for form state and assignment list
