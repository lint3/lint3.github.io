var page = document.getElementById("page");
var resultSection = document.getElementById("results");
var submitButton = document.getElementById("submit-button");
var bldgInput = document.getElementById("building-input")
submitButton.addEventListener('click', testInput);

function testInput(parent) {
  // var bldgInputResult = bldgInput.value;
  
  var loadingIcon = document.createElement('img');
  loadingIcon.setAttribute("id", "loading-icon");
  loadingIcon.setAttribute("src", "/assets/icons/loading.gif");
  resultSection.appendChild(loadingIcon);
    
  setTimeout(function() {
    resultSection.removeChild(document.getElementById("loading-icon"));
    resultSection.textContent = "Result: Ride your bike to campus, then park it wherever you want for free!";
  }, 10);
  
}

var map = L.map('map').setView([41.740, -111.807], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
