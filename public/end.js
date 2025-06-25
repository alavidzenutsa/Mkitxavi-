const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const categoryDisplay = document.getElementById('category');

const mostRecentScore = localStorage.getItem('mostRecentScore');
const category = localStorage.getItem('category');

finalScore.innerText = mostRecentScore;
categoryDisplay.innerText = category.charAt(0).toUpperCase() + category.slice(1);

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        username: username.value,
        score: mostRecentScore,
        category: category,
        date: new Date().toISOString()
    };

    fetch('/api/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(score),
    })
    .then(response => response.json())
    .then(() => {
        window.location.assign('/highscores.html');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save score! Please try again.');
    });
};

window.addEventListener('DOMContentLoaded', () => {
    startConfetti();
});

function startConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 120;
    const confetti = [];
    const colors = ['#bfae99', '#f8f5f0', '#fff', '#222'];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: colors[Math.floor(Math.random() * colors.length)],
            tilt: Math.floor(Math.random() * 10) - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + (c.r / 3), c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
        });
        update();
    }

    function update() {
        confetti.forEach((c, i) => {
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.x += Math.sin(0.01 * c.d);
            c.tiltAngle += c.tiltAngleIncremental;
            c.tilt = Math.sin(c.tiltAngle) * 15;

            if (c.y > canvas.height) {
                confetti[i] = {
                    x: Math.random() * canvas.width,
                    y: -10,
                    r: c.r,
                    d: c.d,
                    color: c.color,
                    tilt: c.tilt,
                    tiltAngleIncremental: c.tiltAngleIncremental,
                    tiltAngle: c.tiltAngle
                };
            }
        });
    }

    (function animateConfetti() {
        draw();
        requestAnimationFrame(animateConfetti);
    })();
} 