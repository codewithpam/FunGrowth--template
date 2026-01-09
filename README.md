FunGrowth – AI Activity Sheet Generator (MVP)

FunGrowth is a simple AI-powered web app that generates kid-friendly printable activity worksheets as PDFs based on:

Topic

Child’s age

Number of questions

Language

The app is designed as an educational MVP to explore how Generative AI + frontend + cloud backend work together in a real project.

🚀 Live Demo

Frontend (Azure Static Web App)
👉 https://icy-mud-008d73803.1.azurestaticapps.net

Backend API (Azure App Service)
👉 https://fungrowth-api-cthkfugqhue3eehe.westeurope-01.azurewebsites.net

🧠 How the App Works
1️⃣ User Input (Frontend – React + TypeScript)

The user enters:

Subject / Topic (e.g. Shapes, Living Things)

Age of the child

Number of questions

Language (English, Tamil, Hindi, Spanish, Norwegian)

2️⃣ API Call

The frontend sends a POST request to:

/generate-pdf


with JSON payload.

3️⃣ AI Content Generation (Backend – Node.js + Express)

The backend uses OpenAI API

Generates age-appropriate worksheet content

Supports multiple languages

Avoids images and answers (print-friendly)

4️⃣ PDF Creation

AI text is converted into a PDF

Unicode fonts are used to support:

Tamil

Hindi

Spanish

Norwegian

The PDF is streamed back to the browser

5️⃣ Download

The user automatically downloads:

FunGrowth-Activity-Sheet.pdf

🏗️ Tech Stack
Frontend

React

TypeScript

Vite

Azure Static Web Apps

Backend

Node.js

Express

OpenAI API

PDFKit

Azure App Service (Linux)

DevOps / Cloud

GitHub Actions (CI/CD)

Azure App Service

Azure Static Web Apps

Environment variables via GitHub Actions

🔐 Environment Variables
Backend (Azure App Service)
OPENAI_API_KEY=your_api_key_here

Frontend (Injected at build time)
VITE_API_URL=https://fungrowth-api-cthkfugqhue3eehe.westeurope-01.azurewebsites.net


Note: For Vite apps, environment variables must be available during build, not runtime.

🎯 What This MVP Demonstrates

Real usage of Generative AI

Clean frontend–backend separation

Multilingual content generation

Secure API key handling

Azure deployment (frontend + backend)

CI/CD with GitHub Actions

🔮 Next Possible Improvements

Save generated worksheets (history)

User accounts / login

Image-based activities

Difficulty levels

Payment / subscription

Teacher dashboard

👏 Final Notes

This project was built as a learning-first MVP to understand:

AI integration

Cloud deployment

Real-world debugging

End-to-end architecture

--

## 🛠️ Development Notes

This project uses Vite + React + TypeScript.

For local development:
- Node.js 18+
- npm install
- npm run dev

Vite provides fast HMR and optimized builds.
