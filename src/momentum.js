    // Toggle mobile
    const menu = document.querySelector('#mobile-menu');
    const menuLinks= document.querySelector('.nb-menu');

    menu.addEventListener('click', function() {
        menu.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
    })

    // Micro Interaction di logo
    var image = document.querySelector('.nb-container img');
    var threshold = 30; // Distance in pixels
    
    // Function untuk menghitung jarak dari image
    function getDistanceFromImage(e, image) {
        var rect = image.getBoundingClientRect();
        var imageX = rect.left + rect.width / 2;
        var imageY = rect.top + rect.height / 2;
        var distX = e.clientX - imageX;
        var distY = e.clientY - imageY;
        return Math.sqrt(distX * distX + distY * distY);
    }
    
    // Event listener
    document.addEventListener('mousemove', function(e) {
        var distance = getDistanceFromImage(e, image);
    
        if (distance < threshold) {
            image.src = 'images/growth.gif';
        } else {
            image.src = 'images/growth.png';
        }
    });



// Momentum Logic
const canvas = document.getElementById('simulationCanvas');
const ctx = canvas.getContext('2d');
let animationId;
let isRunning = false;
let ball1, ball2;

// Make canvas responsive
function resizeCanvas() {
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth;
    canvas.width = containerWidth;
    canvas.height = containerWidth * 0.5; // 2:1 aspect ratio
    
    // Reinitialize balls if they exist
    if (ball1 && ball2) {
        const mass1 = parseFloat(document.getElementById('mass1').value);
        const velocity1 = parseFloat(document.getElementById('velocity1').value);
        const mass2 = parseFloat(document.getElementById('mass2').value);
        const velocity2 = parseFloat(document.getElementById('velocity2').value);
        
        ball1 = new Ball(canvas.width * 0.25, canvas.height/2, mass1, velocity1, '#87CEEB');
        ball2 = new Ball(canvas.width * 0.75, canvas.height/2, mass2, velocity2, '#FF69B4');
        
        drawScene();
    }
}

class Ball {
    constructor(x, y, mass, velocity, color) {
        this.x = x;
        this.y = y;
        this.mass = mass;
        this.velocity = velocity;
        this.radius = Math.sqrt(mass) * (canvas.width / 40);
        this.color = color;
    }

    draw() {
        // Draw ball
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw velocity vector
        const vectorScale = canvas.width / 16;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.velocity * vectorScale, this.y);
        ctx.strokeStyle = this.velocity > 0 ? '#4CAF50' : '#f44336';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw arrowhead
        const arrowSize = 10;
        const angle = this.velocity > 0 ? 0 : Math.PI;
        ctx.beginPath();
        ctx.moveTo(this.x + this.velocity * vectorScale, this.y);
        ctx.lineTo(
            this.x + this.velocity * vectorScale - arrowSize * Math.cos(angle - Math.PI/6),
            this.y - arrowSize * Math.sin(angle - Math.PI/6)
        );
        ctx.lineTo(
            this.x + this.velocity * vectorScale - arrowSize * Math.cos(angle + Math.PI/6),
            this.y - arrowSize * Math.sin(angle + Math.PI/6)
        );
        ctx.closePath();
        ctx.fillStyle = this.velocity > 0 ? '#4CAF50' : '#f44336';
        ctx.fill();
    }

    update() {
        this.x += this.velocity * (canvas.width / 800);
        
        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.velocity *= -1;
        } else if (this.x + this.radius >= canvas.width) {
            this.x = canvas.width - this.radius;
            this.velocity *= -1;
        }
    }
}

function drawBackground() {
    // Fill background
    ctx.fillStyle = '#e8f4f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for(let x = 0; x < canvas.width; x += canvas.width/20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for(let y = 0; y < canvas.height; y += canvas.height/10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    ball1.draw();
    ball2.draw();
    updateMeasurements();
}

function checkCollision(b1, b2) {
    const dx = b2.x - b1.x;
    const distance = Math.abs(dx);
    
    if (distance <= b1.radius + b2.radius) {
        const v1 = ((b1.mass - b2.mass) * b1.velocity + 2 * b2.mass * b2.velocity) / (b1.mass + b2.mass);
        const v2 = ((b2.mass - b1.mass) * b2.velocity + 2 * b1.mass * b1.velocity) / (b1.mass + b2.mass);
        
        b1.velocity = v1;
        b2.velocity = v2;
        
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
    const totalMomentum_ball1 = ball1.mass * ball1.velocity
    const totalMomentum_ball2 = ball2.mass * ball2.velocity
    const totalEnergy = 0.5 * ball1.mass * ball1.velocity * ball1.velocity + 
                      0.5 * ball2.mass * ball2.velocity * ball2.velocity;
    
    document.getElementById('totalMomentum_ball1').textContent = totalMomentum_ball1.toFixed(2);
    document.getElementById('totalMomentum_ball2').textContent = totalMomentum_ball2.toFixed(2);
    document.getElementById('totalEnergy').textContent = totalEnergy.toFixed(2);
}

function animate() {
    drawScene();
    ball1.update();
    ball2.update();
    checkCollision(ball1, ball2);
    
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
    isRunning = false;
    cancelAnimationFrame(animationId);
    
    ball1 = new Ball(canvas.width * 0.25, canvas.height/2, 
        parseFloat(document.getElementById('mass1').value),
        parseFloat(document.getElementById('velocity1').value),
        '#87CEEB');
    
    ball2 = new Ball(canvas.width * 0.75, canvas.height/2,
        parseFloat(document.getElementById('mass2').value),
        parseFloat(document.getElementById('velocity2').value),
        '#FF69B4');
    
    drawScene();
}

// Initial setup
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
resetSimulation();