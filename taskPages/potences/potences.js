let correctAnswers = 0;
let incorrectAnswers = 0;
let totalQuestions = 0;
let timerInterval;
let chartInstance = null;

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('submitButton').addEventListener('click', submitAnswer);
document.getElementById('answerInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        submitAnswer();
    }
});

function startGame() {
    correctAnswers = 0;
    incorrectAnswers = 0;
    totalQuestions = 0;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('resultChart').classList.add('hidden');
    document.getElementById('startButton').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();
    nextQuestion();
    startTimer();
}

function startTimer() {
    let timeLeft = 60;
    document.getElementById('timer').textContent = `${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function nextQuestion() {
    const number = Math.floor(Math.random() * 20) + 1;
    document.getElementById('task').textContent = `Square of ${number}`;
    document.getElementById('task').dataset.answer = number * number;
    document.getElementById('answerInput').value = '';
    document.getElementById('answerInput').focus();
}

function submitAnswer() {
    const userAnswer = parseInt(document.getElementById('answerInput').value);
    const correctAnswer = parseInt(document.getElementById('task').dataset.answer);
    if (userAnswer === correctAnswer) {
        correctAnswers++;
        document.getElementById('resultImage').src = 'tick.png';
    } else {
        incorrectAnswers++;
        document.getElementById('resultImage').src = 'cross.png';
    }
    document.getElementById('result').classList.remove('hidden');
    totalQuestions++;
    setTimeout(() => {
        document.getElementById('result').classList.add('hidden');
        if (totalQuestions < 10) { // example condition, you can set your own limit
            nextQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function endGame() {
    document.getElementById('game').classList.add('hidden');
    document.getElementById('startButton').classList.remove('hidden');
    displayResults();
}

function displayResults() {
    const ctx = document.getElementById('resultChart').getContext('2d');
    
    // Destroy the previous chart instance if it exists
    if (chartInstance) {
        chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Correct', 'Incorrect'],
            datasets: [{
                label: 'Answers',
                data: [correctAnswers, incorrectAnswers],
                backgroundColor: ['#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: function(value) {
                        return value;
                    }
                }
            }
        }
    });
    document.getElementById('resultChart').classList.remove('hidden');
}
