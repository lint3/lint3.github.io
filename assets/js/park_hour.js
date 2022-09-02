var page = document.getElementById("page");
var resultSection = document.getElementById("results");
var submitButton = document.getElementById("submit-button");
var bldgInput = document.getElementById("building-input")
submitButton.addEventListener('click', testInput);


function testInput(parent) {
  // var bldgInputResult = bldgInput.value;
  
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

var buildings = Array("AGRS", "ASTE", "ARC" "AVAP", "BNR", "BSH", "CAINE", "BTEC", "CS", "CYNH", "DAVIS", "DCH", "EBLS", "EDUC", "ENGR",  "ENLAB", "FAC", "GEOL", "GREAV", "HPER", "HSS", "JONES", "LIB", "LILLY", "LUND", "MAIN", "MOEN", "RECYC", "RWST", "SER", "TECH", "TSC", "UAC", "VDL", "VSB");

document.getElementById("randomize-building").addEventListener('click', randomizeBuilding);
function randomizeBuilding(parent) {
  var randomBuilding = buildings[Math.floor(Math.random() * buildings.length)];
  document.getElementById("building-input").value = randomBuilding;
}

var map = L.map('map').setView([41.743, -111.810], 16);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
