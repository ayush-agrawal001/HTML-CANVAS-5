// Select the canvas element from the HTML document
var canvas = document.querySelector("canvas");

// Set the width and height of the canvas to match the window dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the 2D rendering context for the canvas
var c = canvas.getContext("2d");

// Function to generate a random number between min and max (inclusive)
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Array containing various sky colors
const skyColors = [
    "#87CEEB", // Sky Blue
    "#ADD8E6", // Light Blue
    "#B0E0E6", // Powder Blue
    "#CAE1FF", // Baby Blue
    "#AFEEEE", // Pale Turquoise
    "#00BFFF", // Deep Sky Blue
    "#1E90FF", // Dodger Blue
    "#6495ED", // Cornflower Blue
    "#4682B4", // Steel Blue
    "#87CEFA"  // Light Sky Blue
];

// Event listener for resizing the window
window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Re-initialize the animation
    init();
});

// Event listener for mouse clicks
window.addEventListener("click", function () {
    // Re-initialize the animation
    init();
});

// Constructor function for creating circles
function Circle(x, y, dx, dy, radius, gravity) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.gravity = gravity;
    // Randomly select a color from the skyColors array
    this.color = skyColors[randomNum(0, skyColors.length)];

    // Method to draw the circle on the canvas
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = "black";
        c.stroke();
    };

    // Method to update the position of the circle
    this.update = function () {
        if (this.y + this.radius > window.innerHeight) {
            // Reverse the vertical velocity and apply a damping factor for bouncing effect
            this.dy = -this.dy * 0.9;
        } else {
            // Apply gravity to the vertical velocity
            this.dy += gravity;
        }
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            // Reverse the horizontal velocity if the circle hits the window boundaries
            this.dx = -this.dx;
        }
        // Update the position of the circle
        this.x += this.dx;
        this.y += this.dy;
        // Redraw the circle
        this.draw();
    };
}

// Array to store instances of Circle objects
var circleArray;

// Function to initialize the animation by creating circles
function init() {
    circleArray = [];
    // Create 500 circles with random properties
    for (let i = 0; i < 500; i++) {
        var dx = randomNum(-2, 2);
        var dy = randomNum(-2, 2);
        radius = randomNum(10, 50);
        var gravity = 2;
        var x = randomNum(0, canvas.width - radius);
        var y = randomNum(0 + 2 * radius, canvas.height - radius);

        // Create a new Circle object and add it to the circleArray
        circleArray.push(new Circle(x, y, dx, dy, radius, gravity));
    }
}

// Function to animate the circles
function anima_circle() {
    // Request the next animation frame
    requestAnimationFrame(anima_circle);
    // Clear the canvas before redrawing
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // Update and draw each circle in the array
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

// Initialize the animation and start it
init();
anima_circle();
