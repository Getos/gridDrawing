const container = document.querySelector('.container');
let size = 16;
let gridPercent;
let eraserMode = false; // To track the eraser mode
// Size request loop
let toggleMode = true;
function sizeTest() {
    let newSize;
    do {
        newSize = prompt("Type a number up to 100");
    } while (newSize > 100);
    return newSize;
}

const btn = document.querySelector('#btn');
btn.addEventListener("click", () => {
    size = sizeTest();
    container.innerHTML = ''; // Clear the previous grid
    createGrid(size);
});

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

// Creating grid
function createGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridPercent = 100 / gridSize; // this formula to guarantee that the box size stay the same 
        gridItem.style.width = `${gridPercent}%`; // Set width as a percentage
        gridItem.style.height = `${gridPercent}%`; // Set height as a percentage
        let gridColor = random_rgba();
        gridItem.style.background = `${gridColor}`;
        container.appendChild(gridItem);
    }
}

createGrid(size); // Initialize the grid

// Toggle eraser mode
function onoff() {
    const btn = document.getElementById('onoff');
    eraserMode = !eraserMode;
    btn.value = eraserMode ? "Eraser: On" : "Eraser: Off";
}
// toggle hover mode
function toggleHover() {
    toggleMode = !toggleMode;
    if (toggleMode) {
        container.addEventListener('mouseover', mouseoverEventHandler);
        container.addEventListener('mousemove', mousemoveEventHandler);
    }
    else {
        container.removeEventListener('mouseover', mouseoverEventHandler);
        container.removeEventListener('mousemove', mousemoveEventHandler);
    }
}
// to draw when mouse is over
function mouseoverEventHandler(event) {
    if (event.target.classList.contains('grid-item') && !event.target.classList.contains(eraserMode ? 'hovered2' : 'hovered')) {
        if (eraserMode) {
            event.target.classList.remove('hovered'); // Ensure it removes the black color class
        } else {
            event.target.classList.remove('hovered2'); // Ensure it removes the white color class
        }
        event.target.classList.add(eraserMode ? 'hovered2' : 'hovered');
    }
}
// to leave the drawing in place
function mousemoveEventHandler(event) {
    if (event.target.classList.contains('grid-item') && !event.target.classList.contains(eraserMode ? 'hovered2' : 'hovered')) {
        if (eraserMode) {
            event.target.classList.remove('hovered'); // Ensure it removes the black color class
        } else {
            event.target.classList.remove('hovered2'); // Ensure it removes the white color class
        }
        event.target.classList.add(eraserMode ? 'hovered2' : 'hovered');
    }
}
// listen to a click and stop /resume the drawing
window.addEventListener("click", toggleHover)