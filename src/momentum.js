// Get DOM elements
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speed-value");
const weightInput = document.getElementById("weight");
const weightValue = document.getElementById("weight-value");
const distanceInput = document.getElementById("distance");
const distanceValue = document.getElementById("distance-value");
const collisionTypeInput = document.getElementById("collision-type");
const directionInput = document.getElementById("direction");
const numObjectsInput = document.getElementById("num-objects");

const canvas = document.getElementById("simulationCanvas");
const ctx = canvas.getContext("2d");

// Update range values on input change
speedInput.oninput = () => speedValue.textContent = speedInput.value;
weightInput.oninput = () => weightValue.textContent = weightInput.value;
distanceInput.oninput = () => distanceValue.textContent = distanceInput.value;

// Object properties
let objects = [{
    speed: 50,
    weight: 50,
    x: 100, // initial x position
    y: 200, // constant y position
    radius: 20,
    direction: "right"
}, {
    speed: 50,
    weight: 50,
    x: 700, // second object initial position
    y: 200, // same y position as first object
    radius: 20,
    direction: "left"
}];

// Draw the objects on the canvas
function drawObjects() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    objects.forEach((object) => {
        ctx.beginPath();
        ctx.arc(object.x, object.y, object.radius, 0, Math.PI * 2);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.closePath();
    });
}

// Function to simulate the movement
function simulate() {
    const numObjects = parseInt(numObjectsInput.value);

    // Update the object properties for the first object
    objects[0].speed = parseInt(speedInput.value);
    objects[0].weight = parseInt(weightInput.value);
    objects[0].direction = directionInput.value;
    objects[0].x = objects[0].direction === "right" ? 100 : canvas.width - 100;

    // If two objects are selected, reset the second object
    if (numObjects === 2) {
        objects[1].speed = parseInt(speedInput.value);
        objects[1].weight = parseInt(weightInput.value);
        objects[1].direction = objects[0].direction === "right" ? "left" : "right";
        objects[1].x = objects[1].direction === "right" ? canvas.width - 100 : 100;
    }

    // Start the animation
    animate(numObjects);
}

// Animation function to move the objects
function animate(numObjects) {
    drawObjects();

    // Move the first object based on speed and direction
    if (objects[0].direction === "right") {
        objects[0].x += objects[0].speed / 10;
    } else {
        objects[0].x -= objects[0].speed / 10;
    }

    // Move the second object if selected
    if (numObjects === 2) {
        if (objects[1].direction === "right") {
            objects[1].x += objects[1].speed / 10;
        } else {
            objects[1].x -= objects[1].speed / 10;
        }

        // Check for collision between the two objects
        if (Math.abs(objects[0].x - objects[1].x) <= objects[0].radius * 2) {
            handleCollision();
        }
    }

    // Continue animating if objects are within canvas bounds
    if (objects[0].x < canvas.width && objects[0].x > 0) {
        requestAnimationFrame(() => animate(numObjects));
    }
}

// Handle collision based on the type
function handleCollision() {
    const collisionType = collisionTypeInput.value;

    if (collisionType === "elastic") {
        // Reverse directions for both objects in elastic collision
        objects[0].direction = objects[0].direction === "right" ? "left" : "right";
        objects[1].direction = objects[1].direction === "right" ? "left" : "right";
    } else {
        // Stop both objects in inelastic collision
        objects[0].speed = 0;
        objects[1].speed = 0;
    }
}
