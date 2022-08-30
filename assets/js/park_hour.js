var page = document.getElementById("page");
var submitButton = document.getElementById("submit-button");
submitButton.addEventListener('click', testInput);

function testInput(parent) {
  var bldgInput = document.getElementById("bldg").value;
  var resultBox = document.createElement('div');
  resultBox.textContent = bldgInput;
  page.appendChild(resultBox);
  
}
