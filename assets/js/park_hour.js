var page = document.getElementById("page");
var resultSection = document.getElementById("results");
var submitButton = document.getElementById("submit-button");
var bldgInput = document.getElementById("building-input")
submitButton.addEventListener('click', testInput);

function testInput(parent) {
  var bldgInputResult = bldgInput.value;
  resultSection.textContent = "Ride your bike to campus, then park it wherever you want for free!";  
}

var map = L.map('map').setView([41.741, -111.808], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
