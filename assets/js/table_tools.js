

const table = document.querySelector('.ttools');
var numCols = table.querySelector('thead tr').childElementCount;
var numRows = table.querySelector('tbody').childElementCount;

table.querySelectorAll('th')
  .forEach((element, columnNo) => {
    element.addEventListener('click', event => {
      sortTable(table, columnNo);
    });
    element.prepend(generateColumnTools(element.getAttribute('datatype')));
  });
    


function setAttributes(element, attributes) {
  for (attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
}

function generateColumnTools(type) {
  var headerActions = document.createElement('div');
  setAttributes(headerActions, {'class': 'header-actions'});
  
  var searchBox = document.createElement('input');
  setAttributes(searchBox, {'type': 'text', 'class': 'column-search', 'placeholder': 'search'});
  headerActions.appendChild(searchBox);
  
  var sortButton = document.createElement('input');
  setAttributes(sortButton, {'type': 'button', 'value': 'sort', 'class': 'column-sort'});
  headerActions.appendChild(sortButton);
  
  if (type == 'numeric') {
    var minBox = document.createElement('input');
    setAttributes(minBox, {'type': 'text', 'class': 'column-min', 'placeholder': 'min'});
    headerActions.appendChild(minBox);
    
    var maxBox = document.createElement('input');
    setAttributes(maxBox, {'type': 'text', 'class': 'column-max', 'placeholder': 'max'});
    headerActions.appendChild(maxBox);
  }
  
  return headerActions;
}
