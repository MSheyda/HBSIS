const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

const confettiColors = ['#ffb6c1', '#ffe4e1', '#b2f7ef', '#f7cac9', '#d72660', '#fff0f6'];
const confettiCount = 120;
const confetti = [];

function randomRange(a, b) {
    return Math.random() * (b - a) + a;
}

for (let i = 0; i < confettiCount; i++) {
    confetti.push({
        x: randomRange(0, W),
        y: randomRange(-H, 0),
        r: randomRange(6, 12),
        d: randomRange(2, 6),
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        tilt: randomRange(-10, 10),
        tiltAngleIncremental: randomRange(0.05, 0.12),
        tiltAngle: 0
    });
}

function drawConfetti() {
    ctx.clearRect(0, 0, W, H);
    confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
        ctx.stroke();
    });
    updateConfetti();
    requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
    confetti.forEach(c => {
        c.y += c.d;
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > H) {
            c.x = randomRange(0, W);
            c.y = randomRange(-20, 0);
            c.tilt = randomRange(-10, 10);
        }
    });
}

window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});

drawConfetti();