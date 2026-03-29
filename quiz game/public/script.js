const quizTitleEl = document.getElementById('quiz-title');
const quizDescEl = document.getElementById('quiz-description');
const questionBox = document.getElementById('question-box');
const optionsContainer = document.getElementById('options');
const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const finalScoreEl = document.getElementById('final-score');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const currentIndexEl = document.getElementById('current-index');
const questionCountEl = document.getElementById('question-count');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const restartBtn = document.getElementById('restart-btn');

let questions = [];
let score = 0;
let index = 0;

const fallbackQuiz = {
  title: 'Offline Quiz (local fallback)',
  description: 'Server not available, using built-in questions.',
  questions: [
    { id: 1, question: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], answer: 'Paris' },
    { id: 2, question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Venus'], answer: 'Mars' },
    { id: 3, question: 'Which language is primarily used for web front-end?', options: ['Python', 'C#', 'JavaScript', 'Ruby'], answer: 'JavaScript' },
    { id: 4, question: 'What does HTTP stand for?', options: ['HyperText Transfer Protocol', 'HyperTech Transfer Program', 'HyperText Transmission Process', 'HighText Transfer Protocol'], answer: 'HyperText Transfer Protocol' },
    { id: 5, question: 'Who wrote the novel 1984?', options: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'Jules Verne'], answer: 'George Orwell' },
    { id: 6, question: 'What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
    { id: 7, question: 'Which element has the chemical symbol O?', options: ['Gold', 'Oxygen', 'Silver', 'Hydrogen'], answer: 'Oxygen' },
    { id: 8, question: 'In which year did humans first land on the Moon?', options: ['1965', '1969', '1972', '1958'], answer: '1969' },
    { id: 9, question: 'What is the square root of 81?', options: ['7', '8', '9', '10'], answer: '9' }
  ]
};

function showError(message) {
  errorEl.textContent = `${message} (using local fallback quiz)`;
  errorEl.classList.remove('hidden');
  loadingEl.classList.add('hidden');
  questionContainer.classList.add('hidden');
  resultContainer.classList.add('hidden');
}

function showQuestion() {
  const question = questions[index];
  questionBox.textContent = question.question;
  optionsContainer.innerHTML = '';

  question.options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.onclick = () => handleAnswer(button, question.answer);
    optionsContainer.appendChild(button);
  });

  currentIndexEl.textContent = index + 1;
  questionCountEl.textContent = questions.length;
  scoreEl.textContent = score;
  totalEl.textContent = questions.length;
}

function handleAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;
  if (isCorrect) {
    score += 1;
    button.classList.add('correct');
  } else {
    button.classList.add('incorrect');
  }

  Array.from(optionsContainer.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) btn.classList.add('correct');
  });

  setTimeout(() => {
    index += 1;
    if (index >= questions.length) {
      finishQuiz();
    } else {
      showQuestion();
    }
  }, 750);
}

function finishQuiz() {
  questionContainer.classList.add('hidden');
  resultContainer.classList.remove('hidden');
  finalScoreEl.textContent = `You scored ${score} out of ${questions.length} correct. Great job!`;
}

function restartQuiz() {
  score = 0;
  index = 0;
  resultContainer.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  showQuestion();
}

function startQuiz(data) {
  quizTitleEl.textContent = data.title;
  quizDescEl.textContent = data.description;
  questions = data.questions;

  if (!questions || questions.length === 0) {
    showError('No questions available.');
    return;
  }

  loadingEl.classList.add('hidden');
  errorEl.classList.add('hidden');
  questionContainer.classList.remove('hidden');
  showQuestion();
}

async function loadQuiz() {
  try {
    const res = await fetch('/api/quiz');
    if (!res.ok) throw new Error('Failed to load quiz data.');

    const data = await res.json();
    startQuiz(data);
  } catch (error) {
    // Use local fallback quiz to enable usage without running backend server
    startQuiz(fallbackQuiz);
    errorEl.textContent = `${error.message} (running fallback quiz)`;
    errorEl.classList.remove('hidden');
    loadingEl.classList.add('hidden');
  }
}

restartBtn.addEventListener('click', restartQuiz);
loadQuiz();
