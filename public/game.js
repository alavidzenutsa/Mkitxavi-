const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const categoryDisplay = document.getElementById("category");
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const spinner = document.getElementById('spinner');
const gameContainer = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || 'geography';

console.log(' თამაში იწყება კატეგორიაში:', category);

// Add fade effect helpers
function fadeOut(element, callback) {
    element.classList.add('fade-out');
    setTimeout(() => {
        element.classList.remove('fade-out');
        if (callback) callback();
    }, 350);
}
function fadeIn(element) {
    element.classList.add('fade-in');
    setTimeout(() => {
        element.classList.remove('fade-in');
    }, 350);
}

async function loadQuestions() {
    try {
        spinner.classList.remove('hidden');
        gameContainer.classList.add('hidden');
        console.log(' ვცდილობ კითხვების ჩატვირთვას...');
        const response = await fetch(`/api/questions/${category}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const loadedQuestions = await response.json();
        console.log(` წარმატებით ჩაიტვირთა ${loadedQuestions.length} კითხვა`);
        
        if (loadedQuestions.length === 0) {
            throw new Error('კითხვები ვერ მოიძებნა!');
        }

        questions = loadedQuestions;
        spinner.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startGame();
    } catch (err) {
        spinner.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        console.error(' კითხვების ჩატვირთვის შეცდომა:', err);
        question.innerText = "შეცდომა კითხვების ჩატვირთვისას. გთხოვთ, სცადოთ თავიდან.";
        alert("კითხვების ჩატვირთვა ვერ მოხერხდა! გთხოვთ, შეამოწმეთ კავშირი და სცადეთ თავიდან.");
    }
}

const startGame = () => {
    try {
        console.log(' თამაში იწყება...');
        questionCounter = 0;
        score = 0;
        availableQuestions = [...questions];
        getNewQuestion();
        categoryDisplay.innerText = translateCategory(category);
        updateScore();
    } catch (err) {
        console.error(' თამაშის დაწყების შეცდომა:', err);
    }
};

const translateCategory = (cat) => {
    const translations = {
        'geography': 'გეოგრაფია',
        'music': 'მუსიკა',
        'history': 'ისტორია',
        'code': 'კოდი',
        'physics': 'ფიზიკა',
        'general': 'ზოგადი ცოდნა'
    };
    return translations[cat] || cat;
};

const getNewQuestion = () => {
    try {
        if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score);
            localStorage.setItem('category', category);
            return window.location.assign('/end.html');
        }

        questionCounter++;
        progressText.innerText = `კითხვა ${questionCounter}/${MAX_QUESTIONS}`;

        const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        if (!currentQuestion) {
            throw new Error('კითხვა ვერ მოიძებნა!');
        }

        // Fade out question and choices, then update and fade in
        fadeOut(question, () => {
            question.innerText = currentQuestion.question;
            fadeIn(question);
        });
        choices.forEach((choice, idx) => {
            fadeOut(choice, () => {
                const number = choice.dataset["number"];
                choice.innerText = currentQuestion.choices[number - 1];
                fadeIn(choice);
            });
        });

        availableQuestions.splice(questionIndex, 1);
        acceptingAnswers = true;
        console.log(` ნაჩვენებია კითხვა ${questionCounter}/${MAX_QUESTIONS}`);
    } catch (err) {
        console.error(' ახალი კითხვის ჩატვირთვის შეცდომა:', err);
        question.innerText = "შეცდომა კითხვის ჩატვირთვისას. გთხოვთ, სცადოთ თავიდან.";
    }
};

const updateScore = () => {
    scoreText.innerText = score;
    console.log(' ქულა განახლდა:', score);
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = parseInt(selectedChoice.dataset["number"]);

        const classToApply = 
            selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        console.log(` არჩეული პასუხი: ${selectedAnswer}, სწორია: ${classToApply === "correct"}`);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

const incrementScore = num => {
    score += num;
    updateScore();
};

// დაიწყოს კითხვების გამოშვება გვერდი როგორც კი ჩაიტვირთება
console.log(' გვერდი ჩაიტვირთა, ვიწყებთ კითხვების ჩატვირთვას...');
loadQuestions(); 