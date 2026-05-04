const quiz = [
  {
    question: "What is 2+2?",
    options: [2, 3, 4, 5],
    correct: 4
  },
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome"],
    correct: "Paris"
  },
  {
    question: "What is JS?",
    options: ["Language", "Database", "OS"],
    correct: "Language"
  }
]

const startPage = document.querySelector('.start-page');
const quizPage = document.querySelector('.quiz-page');
const resultPage = document.querySelector('.result-page');
const result = resultPage.querySelector('p');
const startBtn = document.querySelector('.start-btn');
const nextQuestionBtn = document.querySelector('.next-question-btn');
const restartBtn = document.querySelector('.restart-btn');
let correctAnswers = 0;
let questionNumber = 0;
let answerChecked = false;

function renderQuestion(questionNumber) {
    answerChecked = false;

    quizPage.querySelector('h2').textContent = quiz[questionNumber].question;

    const answers = quizPage.querySelector('.answer-options');
    answers.innerHTML = '';

    quiz[questionNumber].options.forEach((option) => {
        const answer = document.createElement('li');
        answer.className = 'answer-option';
        answer.textContent = option;
        answers.appendChild(answer);

        answer.addEventListener('click', () => {
            handleAnswer(questionNumber, option, answers);
            answer.style.backgroundColor = 'rgba(163, 82, 200, 0.8)';
            answerChecked = true;
        });
    });
};

function handleAnswer(questionNumber, option, answers) {
    const isCorrect = quiz[questionNumber].correct === option;
    if (isCorrect === true) {
        correctAnswers++;
    }
    result.textContent = `${correctAnswers}`;

    answers.querySelectorAll('.answer-option').forEach((option) => option.style.pointerEvents = 'none');
};

startBtn.addEventListener('click', () => {
    renderQuestion(questionNumber);
    startPage.style.display = 'none';
    quizPage.style.display = 'flex';
});

nextQuestionBtn.addEventListener('click', () => {
    if (answerChecked) {
        if (questionNumber < quiz.length) {
            questionNumber++;
            renderQuestion(questionNumber);
        };
        if (questionNumber === quiz.length - 1) {
            nextQuestionBtn.textContent = 'End quiz';
            questionNumber++;
        } else if (questionNumber === quiz.length) {
            quizPage.style.display = 'none';
            resultPage.style.display = 'flex';
        }
    };
});

restartBtn.addEventListener('click', () => {
    correctAnswers = 0;
    questionNumber = 0;
    nextQuestionBtn.textContent = 'Next';
    result.textContent = '';
    resultPage.style.display = 'none';
    startPage.style.display = 'flex';
});