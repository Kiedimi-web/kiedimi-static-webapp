const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function createStars() {
    const count = Math.floor((canvas.width * canvas.height) / 6000);
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.4 + 0.3,
            baseAlpha: Math.random() * 0.6 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinklePhase: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * 0.05,
            driftY: (Math.random() - 0.5) * 0.05
        });
    }
}

function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const star of stars) {
        star.x += star.driftX;
        star.y += star.driftY;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
        const alpha = star.baseAlpha + twinkle * 0.3;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, Math.min(1, alpha))})`;
        ctx.fill();
    }
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    createStars();
});

resize();
createStars();
requestAnimationFrame(animate);
