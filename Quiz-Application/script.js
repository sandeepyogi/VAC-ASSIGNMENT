// Quiz data - replace with your new set of questions
const questions = [
    {
        question: "What is the capital city of Italy?",
        answers: [
            { text: "Berlin", correct: false},
            { text: "Madrid", correct: false},
            { text: "Rome", correct: true},
            { text: "Paris", correct: false},
        ]
    },
    {
        question: "Who discovered gravity?",
        answers: [
            { text: "Isaac Newton", correct: true},
            { text: "Albert Einstein", correct: false},
            { text: "Galileo Galilei", correct: false},
            { text: "Nikola Tesla", correct: false},
        ]
    },
    {
        question: "What is the largest mammal on Earth?",
        answers: [
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Hippo", correct: false},
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Leonardo da Vinci", correct: true},
            { text: "Pablo Picasso", correct: false},
            { text: "Vincent van Gogh", correct: false},
            { text: "Claude Monet", correct: false},
        ]
    }
];

// DOM elements
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variables
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

// Function to display a question
function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerText = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.addEventListener("click", () => selectAnswer(answer.correct));
    });
}

// Function to reset the state of the quiz
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle user selection of an answer
function selectAnswer(correct) {
    if (correct) {
        score++;
    }

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.dataset.correct) {
            button.classList.add("correct");
        } else {
            button.classList.add("incorrect");
        }
    });

    nextButton.style.display = "block";
}

// Function to display the final score
function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// Function to handle the "Next" button click
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

// Event listener for the "Next" button
nextButton.addEventListener("click", handleNextButton);

// Start the quiz
startQuiz();
