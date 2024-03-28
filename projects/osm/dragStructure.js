/*

Drag things into other things.

*/

function setRandomPastel(element) {
    let color = "hsl(" + 270 * Math.random() + ',' +
                    (20 + 10 * Math.random()) + '%,' +
                    (87 + 10 * Math.random()) + '%)';
    element.style.cssText = 'background: ' + color;
}

function createDraggable(dropeeOk) {
    var box = document.createElement('div');
    box.setAttribute('class', 'group');
    box.setAttribute('draggable', 'true');
    // Dragee
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragend', dragEnd);
    // Drag target
    if (dropeeOk) {
        box.classList.add('dropee');
        box.addEventListener('dragenter', dragEnter);
        box.addEventListener('dragleave', dragLeave);
        box.addEventListener('drop', drop);
        box.addEventListener('dragover', dragOver);
    }
    setRandomPastel(box);
    return box;
}



// DRAGEE

// Started dragging this element
function dragStart(event) {
    dragged = event.target;
    event.target.classList.add("dragging");
}

// Stopped dragging this element (maybe by pressing esc)
function dragEnd(event) {
    event.target.classList.remove("dragging");
}


// DRAG TARGET

// Just to allow drop
function dragOver(event) {
    event.preventDefault();
}

// Some element has been dragged over this one
function dragEnter(event) {
    if (event.target.classList.contains("dropee")) {
        event.target.classList.add("dragover");
    }
}

// Some element has been dragged out of this one
function dragLeave(event) {
    if (event.target.classList.contains("dropee")) {
        event.target.classList.remove("dragover");
    }
}

// Some element has been dropped here
function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains("dropee")) {
        event.target.classList.remove("dragover");
        event.target.appendChild(dragged);
    }
}