const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let score = 0;
let time = 0;
let direction = "RIGHT";
let gameInterval = null;
let timerInterval = null;
let paused = false;
let gameOver = false;

const scoreEl = document.getElementById("score");
const timerEl = document.getElementById("timer");
const resultEl = document.getElementById("result");
const restartBtn = document.getElementById("restartBtn");

// Snake
let snake = [{ x: 9 * box, y: 10 * box }];

// Food
let food = randomFood();

// Controls
document.addEventListener("keydown", setDirection);
document.getElementById("pauseBtn").onclick = pauseGame;
document.getElementById("resumeBtn").onclick = resumeGame;
restartBtn.onclick = restartGame;

// Metrics data
let survivalHistory = [];

// Chart instances
let scoreChart, foodRateChart, survivalChart;

function setDirection(e) {
    if (paused) return;
    if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };
}

function drawGame() {
    if (paused) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((part, i) => {
        ctx.fillStyle = i === 0 ? "#1b5e20" : "#4caf50";
        ctx.fillRect(part.x, part.y, box, box);
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    // Eat food
    if (headX === food.x && headY === food.y) {
        score++;
        scoreEl.innerText = "Score: " + score;
        food = randomFood();
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };

    // Game Over
    if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width || headY >= canvas.height ||
        snake.some(s => s.x === newHead.x && s.y === newHead.y)
    ) {
        endGame();
        return;
    }

    snake.unshift(newHead);
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (!paused) {
            time++;
            timerEl.innerText = "Time: " + time + "s";
            updateCharts();
        }
    }, 1000);
}

// Buttons
function pauseGame() { paused = true; }
function resumeGame() { paused = false; }

function restartGame() {
    if (!gameOver) {
        resultEl.innerText = "⚠️ Finish the current attempt first!";
        return;
    }

    clearInterval(gameInterval);
    clearInterval(timerInterval);

    // Reset everything
    score = 0; time = 0; direction = "RIGHT"; paused = false;
    snake = [{ x: 9 * box, y: 10 * box }];
    food = randomFood();
    gameOver = false;

    scoreEl.innerText = "Score: 0";
    timerEl.innerText = "Time: 0s";
    resultEl.innerText = "";

    restartBtn.disabled = true; // disable until next Game Over
    startGame();
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameOver = true;

    resultEl.innerText = `Game Over | Score: ${score} | Time: ${time}s`;

    // Record survival time
    survivalHistory.push(time);
    survivalChart.data.labels.push("Game " + survivalHistory.length);
    survivalChart.data.datasets[0].data.push(time);
    survivalChart.update();

    restartBtn.disabled = false; // enable restart after game ends
}

function startGame() {
    if (!scoreChart) initCharts(); // only init once
    gameInterval = setInterval(drawGame, 120);
    startTimer();
    restartBtn.disabled = true;
}

// Charts
function initCharts() {
    scoreChart = new Chart(document.getElementById("scoreChart"), {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Score Progression",
                data: [],
                borderColor: "green",
                fill: false
            }]
        }
    });

    foodRateChart = new Chart(document.getElementById("foodRateChart"), {
        type: "line",
        data: {
            labels: [],
            datasets: [{
                label: "Food Rate (score/sec)",
                data: [],
                borderColor: "red",
                fill: false
            }]
        }
    });

    survivalChart = new Chart(document.getElementById("survivalChart"), {
        type: "bar",
        data: {
            labels: [],
            datasets: [{
                label: "Survival Time (s)",
                data: [],
                backgroundColor: "blue"
            }]
        }
    });
}

function updateCharts() {
    scoreChart.data.labels.push(time);
    scoreChart.data.datasets[0].data.push(score);
    scoreChart.update();

    foodRateChart.data.labels.push(time);
    foodRateChart.data.datasets[0].data.push(
        time > 0 ? (score / time).toFixed(2) : 0
    );
    foodRateChart.update();
}

startGame();