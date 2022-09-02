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
  loadingIcon.setAttribute("style", "width: 1em; height: 1em;");
  document.getElementById("submit-button-wrapper").appendChild(loadingIcon);
    
  setTimeout(function() {
    resultSection.removeChild(document.getElementById("loading-icon"));
    resultSection.textContent = "Result: Ride your bike to campus, then park it wherever you want for free!";
  }, 5000);
  
}

var map = L.map('map').setView([41.740, -111.807], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
