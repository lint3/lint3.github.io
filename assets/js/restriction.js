/*

var laneIconsForward = {
  "through": "\u2191",
  "through;right": "\u2191\u21B1",
  "through;left": "\u2191\u21B0",
  "right": "\u21B1",
  "left": "\u21B0",
}

var laneIconsBackward = {
  "through": "\u2193",
  "through;right": "\u2193\u21B2",
  "through;left": "\u2191\u21B3",
  "right": "\u21B2",
  "left": "\u21B3",
}

var laneIconsBoth = {
  "left": "\u21B3\u21B0",
}
  

function buildLane(lanetype, direction) {
  var lane = document.createElement('div');
  lane.setAttribute("class", "lane-element lane " + lanetype + " " + direction);
  var label = document.createElement('p');
  if (direction === "forward") {
    label.textContent = laneIconsForward[lanetype];
  } else if (direction === "backward") {
    label.textContent = laneIconsBackward[lanetype];
  } else if (direction === "both_ways") {
    label.textContent = laneIconsBoth[lanetype];
  }
  lane.appendChild(label)
  return lane;
}

function buildSpacer(spacerClass) {
  var spacer = document.createElement('div');
  spacer.setAttribute("class", "lane-element " + spacerClass);
  return spacer;
}

function buildLaneMarker(markerType) {
  var laneMarker = document.createElement('div');
  laneMarker.setAttribute("class", "lane-element lane-marker " + markerType);
  return laneMarker;
}

function buildRoad(parent) {
  
  var laneInfo = parseOsmTags(document.getElementById("tagbox").value);
  
  var road = document.createElement('div');
  road.setAttribute("class", "road");
  
  road.appendChild(buildSpacer("pre-spacer"));
  road.appendChild(buildLaneMarker("marker-outside"));
  
  for(let backwardLane = laneInfo[2].length - 1; backwardLane >=0; --backwardLane) {
    road.appendChild(buildLane(laneInfo[2][backwardLane], "backward"));
    road.appendChild(buildLaneMarker("marker-mid"));
  }

  for (let middleLane = 0; middleLane < laneInfo[1].length; ++middleLane) {
    road.appendChild(buildLaneMarker("center-left"));
    road.appendChild(buildLane(laneInfo[1][middleLane], "both_ways"));
    road.appendChild(buildLaneMarker("center-right"));
  }
  for (let forwardLane = 0; forwardLane < laneInfo[0].length; ++forwardLane) {
    road.appendChild(buildLaneMarker("marker-mid"));
    road.appendChild(buildLane(laneInfo[0][forwardLane], "forward"));
  }
  road.appendChild(buildLaneMarker("marker-outside"));
  road.appendChild(buildSpacer("post-spacer"));

  page.prepend(road);
}

function parseOsmTags(chunk) {

  let totalLanes = 0;
  let forwardLanes = [];
  let backwardLanes = [];
  let bothLanes = [];
  errorMsg = "";
  
  let tags = chunk.split("\n");
  
  // For each line of text in tags:
  for (let i = 0; i < tags.length; ++i) {
    let tag = tags[i].split("=");
    let key = tag[0];
    let value = tag[1];
    
    // Check which key the tag contains
    switch (key) {
      case "lanes":
        totalLanes = parseInt(value, 10);
        break;
        
      case "lanes:forward":
        if (forwardLanes.length == 0) {
          forwardLanes = Array(parseInt(value, 10)).fill("thru");
        } else {
          // Check that the correct number of lanes are in there
          if (forwardLanes.length != parseInt(value, 10)) {
            errorMsg = "Conflicting values for forward number of lanes";
          }
        }
        break;
      case "lanes:backward":
        if (backwardLanes.length == 0) {
          backwardLanes = Array(parseInt(value, 10)).fill("thru");
        } else {
          // Check that the correct number of lanes are in there
          if (backwardLanes.length != parseInt(value, 10)) {
            errorMsg = "Conflicting values for backward number of lanes";
          }
        }
        break;
      case "lanes:both_ways":
        if (bothLanes.length == 0) {
          bothLanes = Array(parseInt(value, 10)).fill("thru");
        } else {
          // Check that the correct number of lanes are in there
          if (bothLanes.length != parseInt(value, 10)) {
            errorMsg = "Conflicting values for both directions number of lanes";
          }
        }
        break;
      case "turn:lanes:forward":
        forwardLanes = value.split("|");
        break;
      case "turn:lanes:backward":
        backwardLanes = value.split("|");
        break;
      case "turn:lanes:both_ways":
        bothLanes = value.split("|");
        break;
      default:
        console.log("Unable to parse tag " + key + "=" + value);
    }
  }
  laneInfo = [forwardLanes, bothLanes, backwardLanes];
  return laneInfo;
}
// laneInfo = [forwardLanes, bothLanes, backwardLanes];


*/

var restrictionType = "";
var transportationMode = "";
var direction = "";
var restrictionValue = "";
var condition = [];

update();

for (selects of document.querySelectorAll("select")) {
  selects.addEventListener('input', update);
}

document.getElementById("add-condition-button").addEventListener('click', addCondition);
var numConditions = 1;

function addCondition(e) {
  cloneFrom = document.getElementsByClassName("condition");
  cloneTo = cloneFrom.cloneNode(true);
  document.getElementById("notebook").appendChild(cloneTo);
  update();
}

function update(e) {
  updatePickers();
  updateOutputString();
}

function updatePickers() {
  for (form of document.getElementsByClassName("form-outer")) {
    myType = form.querySelector("select").value;
    for (detailsPicker of form.getElementsByClassName("details-picker-inner")) {
      detailsPicker.style.display = "none";
    }
    
    correctDetailsPicker = document.getElementById(form.id + "-" + myType + "-wrapper");
    if (correctDetailsPicker != null ) {
      correctDetailsPicker.style.display = "block";
    }
  }
}

function updateOutputString() {
  restrictionType = document.getElementById("restriction-type").value;
  transportationMode = document.getElementById("transportation-type").value;
  direction = "";
  restrictionValue = "";
  
  if (restrictionType != "") {
    restrictionType = restrictionType + ":";
  }
  if (direction != "") {
    direction = ":" + direction;
  }
  
  finalString = restrictionType + transportationMode + direction + ":conditional = " + condition[0];
  for (let i = 1; i < condition.length; i++) {
    finalString = finalString + condition[i] + ";";
  }
  
  document.getElementById("results-box").textContent = finalString;
}

// var submitButton = document.getElementById("submittags");
// submitButton.addEventListener('click', buildRoad);

// submitButton.setAttribute("onclick", "buildRoad()");




























