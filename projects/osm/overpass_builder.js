var page = document.getElementById("page");
var resultSection = document.getElementById("results");
var submitButton = document.getElementById("submit-button");
var bldgInput = document.getElementById("building-input")
submitButton.addEventListener('click', testInput);

// Create parent group
buildGroup(page, 'and');

buildDragTest(page);
buildDragTest(page);
buildDragTest(page);
buildDragTest(page);

function buildDragTest(parent) {
    var dragItem = document.createElement('div');
    dragItem.setAttribute('class', 'box');
    parent.appendChild(dragItem);
}

function buildGroup(parent, groupType) {
    var groupWrapper = document.createElement('div');
    groupWrapper.setAttribute('class', 'group ' + groupType);
    groupWrapper.setAttribute('type', groupType);
    
    var addConditionButton = document.createElement('input');
    addConditionButton.setAttribute('type', 'button');
    addConditionButton.setAttribute('value', 'Add Condition');
    groupWrapper.appendChild(addConditionButton);
    
    var addGroupButton = document.createElement('input');
    addGroupButton.setAttribute('type', 'button');
    addGroupButton.setAttribute('value', 'Add Group');
    groupWrapper.appendChild(addGroupButton);
    
    parent.appendChild(groupWrapper);
}

function testInput(parent) {
  
  resultSection.textContent = "";
  
  var loadingIcon = document.createElement('img');
  loadingIcon.setAttribute("id", "loading-icon");
  loadingIcon.setAttribute("src", "/assets/icons/loading.gif");
  loadingIcon.setAttribute("style", "width: 1em; height: 1em; margin-left: 0.5em; margin-top: 0; padding: 1px 4px;");
  document.getElementById("submit-button-wrapper").appendChild(loadingIcon);
    
  setTimeout(function() {
    document.getElementById("submit-button-wrapper").removeChild(document.getElementById("loading-icon"));
    resultSection.textContent = "Result: Ride your bike to campus, then park it wherever you want for free!";
  }, 3000);
  
}

var buildings = Array("AGRS", "ASTE", "ARC", "AVAP", "BNR", "BSH", "CAINE", "BTEC", "CS", "CYNH", "DAVIS", "DCH", "EBLS", "EDUC", "ENGR", "ENLAB", "FAC", "GEOL", "GREAV", "HPER", "HSS", "JONES", "LIB", "LILLY", "LUND", "MAIN", "MOEN", "RECYC", "RWST", "SER", "TECH", "TSC", "UAC", "VDL", "VSB");

document.getElementById("randomize-building").addEventListener('click', randomizeBuilding);

function randomizeBuilding(parent) {
  var randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];
  document.getElementById("building-input").value = randomBuilding;
}
