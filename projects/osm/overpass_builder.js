var container = document.getElementById('query-builder-container');
var rootGroup = createLogicalGroup('and');
container.appendChild(rootGroup);

let dragged;

function createLogicalGroup(logicType) {
    var group = createDraggable();
    group.appendChild(createAddForm());
    group.classList.add('logical');
    group.classList.add(logicType);
    return group;
}

function createRequirement(reqType) {
    var group = createDraggable();
    group.classList.add('requirement');
    group.classList.add(reqType);
    return group;
}

function createAddForm() {
    var formDiv = document.createElement('div');
    formDiv.classList.add('add-form');
    
    var newReqButton = document.createElement('input');
    newReqButton.setAttribute('type', 'button');
    newReqButton.setAttribute('value', '+Req');
    newReqButton.addEventListener('click', (event) => {
        event.target.closest(".group").appendChild(createRequirement());
    });
    
    var newLogicButton = document.createElement('input');
    newLogicButton.setAttribute('type', 'button');
    newLogicButton.setAttribute('value', '+Grp');
    newLogicButton.addEventListener('click', (event) => {
        event.target.closest(".group").appendChild(createLogicalGroup());
    });
    
    formDiv.appendChild(newReqButton);
    formDiv.appendChild(newLogicButton);
    return formDiv;
}


function createDraggable() {
    var box = document.createElement('div');
    box.setAttribute('class', 'group');
    box.setAttribute('draggable', 'true');
    // Dragee
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragend', dragEnd);
    // Drag target
    box.addEventListener('drop', drop);
    box.addEventListener('dragover', dragOver);
    
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
    if (event.target.classList.contains("group")) {
        event.target.classList.add("dragover");
    }
}

// Some element has been dragged out of this one
function dragLeave(event) {
    if (event.target.classList.contains("group")) {
        event.target.classList.add("dragover");
    }
}

// Some element has been dropped here
function drop(event) {
    event.preventDefault();
    if (event.target.classList.contains("group")) {
        event.target.classList.remove("dragover");
        event.target.appendChild(dragged);
    }
}