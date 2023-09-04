let currentSize;
let currentMode = 'color';
let lastMode;
let mouseDown = false;

const buttons = document.querySelectorAll('button');

// Function to check if the current mode is eraser if thats the case set the current mode to the last mode
const setCurrentMode = () => currentMode === 'eraser' ? currentMode = lastMode : currentMode;

// Function to ask the user how many squares he wants and set the new size
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

// Function to check if the current mode is a color mode 
//in that case set last mode to current mode and change current mode to eraser
function setEraser () {
    currentMode == 'color' || currentMode == 'rainbow' ? lastMode = currentMode : currentMode;
    currentMode = 'eraser';
}

// Function to remove the existing squares, generate the new squares with the current size and set the current mode 
function clearGrid () {
    removeSquares();
    generateSquares(currentSize);
    setCurrentMode();
}

// Function to color the squares when mouse is clicked
function colorSquare (e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    e.target.style.backgroundColor = currentMode == 'color' ? '#333' : 
        currentMode == 'rainbow' ? "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") :
            currentMode == 'eraser' ? '#fefefe' : currentMode;
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

function sketch () {
    generateSquares();

    // Check if mouse is clicked
    document.body.onmousedown = () => mouseDown = true;
    document.body.onmouseup = () => mouseDown = false;

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            button.id === 'new-size' ? setNewSize() :
                button.id === 'color-mode' ? currentMode = 'color' :
                    button.id === 'rainbow-mode' ? currentMode = 'rainbow' :
                        button.id === 'eraser' ? setEraser() :
                            button.id === 'clear' ? clearGrid() : button.id;
        });
    });
};


// Function calling
paint();