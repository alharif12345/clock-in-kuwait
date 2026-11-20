const clock = document.querySelector("#clock");
const dateElement = document.querySelector("#date");

const digits = [
    ["a", "b", "c", "d", "e", "f"],
    ["b", "c"],
    ["a", "b", "g", "e", "d"],
    ["a", "b", "g", "c", "d"],
    ["f", "g", "b", "c"],
    ["a", "f", "g", "c", "d"],
    ["a", "f", "g", "e", "c", "d"],
    ["a", "b", "c"],
    ["a", "b", "c", "d", "e", "f", "g"],
    ["a", "b", "c", "d", "f", "g"]
];

function createDigit(number) {
    return `
        <span class="digit">
            ${["a", "b", "c", "d", "e", "f", "g"]
                .map(segment => `
                    <i class="seg ${segment} ${
                        digits[number].includes(segment) ? "on" : ""
                    }"></i>
                `).join("")}
        </span>
    `;
}

function updateClock() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    clock.innerHTML = `
        ${createDigit(Number(hours[0]))}
        ${createDigit(Number(hours[1]))}

        <span class="colon">:</span>

        ${createDigit(Number(minutes[0]))}
        ${createDigit(Number(minutes[1]))}

        <span class="colon">:</span>

        ${createDigit(Number(seconds[0]))}
        ${createDigit(Number(seconds[1]))}
    `;

    dateElement.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

updateClock();
setInterval(updateClock, 1000);


// PARTICLES

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random()
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(0, 220, 255, ${p.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00eaff";
        ctx.fill();
    });

    requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();

window.addEventListener("resize", resizeCanvas);