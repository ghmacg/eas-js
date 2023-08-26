const newSizeBtn = document.querySelector('#new-size');
const colorModeBtn = document.querySelector('#color-mode');
const rainbowModeBtn = document.querySelector('#rainbow-mode');
const eraserBtn = document.querySelector('#eraser');
const clearBtn = document.querySelector('#clear');


newSizeBtn.addEventListener('click', () => {
    let userInput = Number(prompt('How many squares do you want?'));

    if ((userInput > 0) && (userInput <= 100)) {
        clearSquares();
        generateSquares(userInput);
    } else {
        alert('ERROR: use numbers between 1-100');
    };
});

// Function to get random color for coloring Rainbow Mode 
function getRandomColor () {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
};

// Check if mouse is clicked
let mouseDown = false;
document.body.onmousedown = function () {
    mouseDown = true;
};
document.body.onmouseup = function () {
    mouseDown = false;
};

// Function to color the squares when mouse is clicked
function colorSquare (e) {
    if (e.type === 'mouseover' && !mouseDown) return;
    
    e.target.style.backgroundColor = getRandomColor();
}

// Function that loops and generates a container (div) each loop for the quantity of squares (divs) wanted 
//and then appends the container to the Grid container
function generateSquares (quantity = 16) {
    const gridContainer = document.querySelector('#grid-container');

    for (let i = 1; i <= quantity; i++) {
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container');

        for (let z = 1; z <= quantity; z++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.addEventListener('mouseover',colorSquare);
            square.addEventListener('mousedown',colorSquare);

            squareContainer.appendChild(square);
        };

        gridContainer.appendChild(squareContainer);
    };
};

// Function to delete all the squares from the grid
function clearSquares () {
    const squareContainer = document.querySelectorAll('.square-container');

    squareContainer.forEach((square) => {
        square.remove();
    });
};