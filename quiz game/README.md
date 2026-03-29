# Quiz Game Web App

Interactive quiz game built with Node.js, Express, and plain HTML/CSS/JavaScript.

## Features
- Dynamic quiz loaded from backend API
- Multiple-choice questions with immediate feedback
- Correct/incorrect styling and score tracking
- .env configuration for quiz title/description and optional API key

## Setup
1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` values (set `QUIZ_TITLE`, `QUIZ_DESCRIPTION`, `API_SECRET_KEY`, `PORT`)
5. Start server:
   ```bash
   npm start
   ```
6. Open `http://localhost:3000`

## GitHub Upload Guided Steps
1. Do NOT commit `.env`. It is ignored by `.gitignore`.
2. Keep `.env.example` in the repo with placeholder values.
3. Create and commit all code files (`server.js`, `package.json`, `public/*`, `README.md`).
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Add quiz game web app"
   git push origin main
   ```

## API Endpoints
- `GET /api/quiz` - returns quiz metadata and questions
- `GET /api/config` - returns configured title + API status

## Optional Development
- Install nodemon globally or use `npm run dev` for hot reload.

## Customization
- Update `server.js` quiz questions array.
- Add questions from external JSON or database.

## Troubleshooting
- Check `PORT` in `.env` and adjust URL if needed.
- If the browser shows loading forever, ensure server is running.
