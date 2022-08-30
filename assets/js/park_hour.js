var page = document.getElementById("page");
var submitButton = document.getElementById("submit-button");
var bldgInput = document.getElementById("building-input")
submitButton.addEventListener('click', testInput);

function testInput(parent) {
  var bldgInputResult = bldgInput.value;
  var resultBox = document.createElement('div');
  resultBox.textContent = bldgInputResult;
  page.appendChild(resultBox);
  
}
