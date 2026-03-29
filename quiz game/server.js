const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const QUIZ_TITLE = process.env.QUIZ_TITLE || 'General Knowledge Quiz';

const quizQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    id: 3,
    question: "Which language is primarily used for web front-end?",
    options: ["Python", "C#", "JavaScript", "Ruby"],
    answer: "JavaScript"
  },
  {
    id: 4,
    question: "What does HTTP stand for?",
    options: ["HyperText Transfer Protocol", "HyperTech Transfer Program", "HyperText Transmission Process", "HighText Transfer Protocol"],
    answer: "HyperText Transfer Protocol"
  },
  {
    id: 5,
    question: "Who wrote the novel '1984'?",
    options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Jules Verne"],
    answer: "George Orwell"
  },
  {
    id: 6,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: "Pacific"
  },
  {
    id: 7,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Silver", "Hydrogen"],
    answer: "Oxygen"
  },
  {
    id: 8,
    question: "In which year did humans first land on the Moon?",
    options: ["1965", "1969", "1972", "1958"],
    answer: "1969"
  },
  {
    id: 9,
    question: "What is the square root of 81?",
    options: ["7", "8", "9", "10"],
    answer: "9"
  }
];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/quiz', (req, res) => {
  res.json({
    title: QUIZ_TITLE,
    description: process.env.QUIZ_DESCRIPTION || 'Test your knowledge in a fun interactive quiz.',
    questions: quizQuestions.map(({ id, question, options }) => ({ id, question, options }))
  });
});

app.get('/api/config', (req, res) => {
  res.json({
    quizTitle: QUIZ_TITLE,
    apiSecretKey: process.env.API_SECRET_KEY ? '***SET***' : 'not-set'
  });
});

app.listen(PORT, () => {
  console.log(`${QUIZ_TITLE} API is running on http://localhost:${PORT}`);
});
