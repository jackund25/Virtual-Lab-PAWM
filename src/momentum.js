const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
let animationId;
let isRunning = false;

class Ball {
    constructor(x, y, mass, velocity, color) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.velocity = velocity;
        this.radius = Math.sqrt(mass) * 20;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.stroke();
        
        // Draw velocity vector
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.velocity * 50, this.y);
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }

    update() {
        this.x += this.velocity;
        
        // Bounce off walls
        if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) {
            this.velocity *= -1;
        }
    }
}

let ball1 = new Ball(200, canvas.height/2, 0.5, 1.0, '#87CEEB');
let ball2 = new Ball(600, canvas.height/2, 1.5, -0.5, '#FF69B4');

function checkCollision(b1, b2) {
    const dx = b2.x - b1.x;
    const distance = Math.abs(dx);
    
    if (distance <= b1.radius + b2.radius) {
        // Elastic collision formulas
        const v1 = ((b1.mass - b2.mass) * b1.velocity + 2 * b2.mass * b2.velocity) / (b1.mass + b2.mass);
        const v2 = ((b2.mass - b1.mass) * b2.velocity + 2 * b1.mass * b1.velocity) / (b1.mass + b2.mass);
        
        b1.velocity = v1;
        b2.velocity = v2;
        
        // Separate balls to prevent sticking
        const overlap = b1.radius + b2.radius - distance;
        const shift = overlap / 2;
        
        if (dx > 0) {
            b1.x -= shift;
            b2.x += shift;
        } else {
            b1.x += shift;
            b2.x -= shift;
        }
    }
}

function updateMeasurements() {
    const totalMomentum = ball1.mass * ball1.velocity + ball2.mass * ball2.velocity;
    const totalEnergy = 0.5 * ball1.mass * ball1.velocity * ball1.velocity + 
                      0.5 * ball2.mass * ball2.velocity * ball2.velocity;
    
    document.getElementById('totalMomentum').textContent = totalMomentum.toFixed(2);
    document.getElementById('totalEnergy').textContent = totalEnergy.toFixed(2);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ball1.update();
    ball2.update();
    
    checkCollision(ball1, ball2);
    
    ball1.draw();
    ball2.draw();
    
    updateMeasurements();
    
    if (isRunning) {
        animationId = requestAnimationFrame(animate);
    }
}

function toggleSimulation() {
    isRunning = !isRunning;
    if (isRunning) {
        animate();
    } else {
        cancelAnimationFrame(animationId);
    }
}

function resetSimulation() {
    ball1 = new Ball(200, canvas.height/2, 
        parseFloat(document.getElementById('mass1').value),
        parseFloat(document.getElementById('velocity1').value),
        '#87CEEB');
    
    ball2 = new Ball(600, canvas.height/2,
        parseFloat(document.getElementById('mass2').value),
        parseFloat(document.getElementById('velocity2').value),
        '#FF69B4');
    
    if (!isRunning) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball1.draw();
        ball2.draw();
        updateMeasurements();
    }
}

// Initial draw
ball1.draw();
ball2.draw();
updateMeasurements();