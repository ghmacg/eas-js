let currentSize;
let currentMode = 'color';

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        button.id === 'new-size' ? setNewSize() :
            button.id === 'color-mode' ? currentMode = 'color' :
                button.id === 'rainbow-mode' ? currentMode = 'rainbow' :
                    button.id === 'eraser' ? currentMode = 'eraser' :
                        button.id === 'clear' ? clearGrid() : 
                            button.id;
    });
});

const setCurrentMode = () => currentMode == 'eraser' ? currentMode = 'color' : currentMode;

function setNewSize () {
    let userInput = Number(prompt('How many squares do you want?'));

    if ((userInput > 0) && (userInput <= 100)) {
        removeSquares();
        generateSquares(userInput);
        currentSize = userInput;
        setCurrentMode();
    } else {
        alert('ERROR: use numbers between 1-100');
    };
};

function clearGrid () {
    removeSquares();
    generateSquares(currentSize);
    setCurrentMode();
}

// Function to get random color for coloring Rainbow Mode 
const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
function getRandomColor () {
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r}, ${g}, ${b})`;
    return rgb;
};

// Check if mouse is clicked
let mouseDown = false;
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;

// Function to color the squares when mouse is clicked
function colorSquare (e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    currentMode == 'color' ? e.target.style.backgroundColor = '#333' : 
        currentMode == 'rainbow' ? e.target.style.backgroundColor = getRandomColor() :
            currentMode == 'eraser' ? e.target.style.backgroundColor = '#fefefe' : 
                currentMode;
};

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
function removeSquares () {
    const squareContainer = document.querySelectorAll('.square-container');

    squareContainer.forEach((square) => {
        square.remove();
    });
};

generateSquares()