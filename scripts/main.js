function generateSquares (quantityOfSquares) {    
    const gridContainer = document.querySelector('#grid-container');

    for (let i = 1; i <= quantityOfSquares; i++) {
        const squareContainer = document.createElement('div');
        squareContainer.classList.add('square-container');

        for (let z = 1; z <= quantityOfSquares; z++) {
            const square = document.createElement('div');
            square.classList.add('square');

            squareContainer.appendChild(square);
        };

        gridContainer.appendChild(squareContainer);
    };
};