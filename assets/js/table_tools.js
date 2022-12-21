
const table = document.querySelector('.ttools > table');

const headers = table.querySelectorAll('th');
const tableBody = table.querySelector('tbody');
const tableWrapper = document.querySelector('.table-wrapper');
const allTableData = table2data(tableBody);

var actionData = {};

var toolsButton = document.createElement('input');
setAttributes(toolsButton, {'type': 'button', 'value': 'filter/sort', 'class': 'tools-button'});
toolsButton.addEventListener('click', (event) => { addTools(); });
tableWrapper.appendChild(toolsButton);

function ColumnDataTemplate() {
  this.query = '';
  this.min = null;
  this.max = null;
  this.sorted = false;
  this.sortAsc = true;
  this.dataType = 'alpha';
};

function addTools() {
  
  for (let i = 0; i < headers.length; i++) {
    actionData[i] = new ColumnDataTemplate();
    actionData[i].dataType = headers[i].getAttribute('datatype');
  }

  // Add tools UI to each header cell
  table.querySelectorAll('th')
    .forEach((element, columnNo) => {
      element.appendChild(generateColumnTools(actionData[columnNo].dataType, columnNo));
    });
    
  var clearButton = document.createElement('input');
  setAttributes(clearButton, {'class': 'clear-input', 'type': 'button', 'value': 'Clear All Filters'});
  clearButton.addEventListener('click', (event) => {
    clearInputs();
  });
  tableWrapper.appendChild(clearButton);
  tableWrapper.removeChild(toolsButton);
}

function clearInputs() {
  for (searchBox of tableWrapper.querySelectorAll('.column-search')) {
    searchBox.value = '';
  }
  for (minBox of tableWrapper.querySelectorAll('.column-min')) {
    minBox.value = '';
  }
  for (maxBox of tableWrapper.querySelectorAll('.column-max')) {
    maxBox.value = '';
  }
  for (i in actionData) {
    actionData[i] = new ColumnDataTemplate();
    actionData[i].dataType = headers[i].getAttribute('datatype');
  }
  updateTable(allTableData);
}

function applyActions() {
  var activeTableData = structuredClone(allTableData);
  var sortColumn = null;
  
  for (i in actionData) {
    var columnActions = getColumnActions(i);
    
    if (columnActions.query != '') {
      activeTableData = filterTable(activeTableData, i, columnActions.query);
    }
    
    if (columnActions.min != null | columnActions.max != null ) {
      activeTableData = clipTable(activeTableData, i, columnActions.min, columnActions.max);
    }
    if (columnActions.sorted) { sortColumn = i; }
  }
  if (sortColumn != null) {
    sortTable(activeTableData, sortColumn, false);
  }
  
  updateTable(activeTableData);

}

function setAttributes(element, attributes) {
  for (attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
}

function getColumnActions(col) {
  if(actionData[col].dataType == 'numeric') {
    actionData[col].min = headers[col].querySelector('.column-min').value;
    actionData[col].max = headers[col].querySelector('.column-max').value;
  } else {
    actionData[col].query = headers[col].querySelector('.column-search').value;
  }
    
  return actionData[col];
}

function generateColumnTools(type, columnNo) {
  // Create wrapper
  var headerActions = document.createElement('div');
  setAttributes(headerActions, {'class': 'header-actions'});
  var applyActionsInputs = [];
  
  // Sort button
  var sortButton = document.createElement('input');
  setAttributes(sortButton, {'type': 'button', 'value': 'sort', 'class': 'column-sort'});
  sortButton.addEventListener('click', (event) => {
    sortTable(null, columnNo, true);
  });
  
  // Min/max inputs
  if (type == 'numeric') {
    var minBox = document.createElement('input');
    setAttributes(minBox, {'type': 'text', 'class': 'column-min', 'placeholder': 'min', 'size': '8'});
    applyActionsInputs.push(minBox);
    
    var maxBox = document.createElement('input');
    setAttributes(maxBox, {'type': 'text', 'class': 'column-max', 'placeholder': 'max', 'size': '8'});
    applyActionsInputs.push(maxBox);
    
  } else {
    // Search filter input
    var searchBox = document.createElement('input');
    setAttributes(searchBox, {'type': 'text', 'class': 'column-search', 'placeholder': 'search'});
    applyActionsInputs.push(searchBox);
  }
  
  for (input of applyActionsInputs) {
    input.addEventListener('keyup', (event) => {
      applyActions();
    });
    headerActions.appendChild(input);
  }

  headerActions.appendChild(sortButton);
  return headerActions;
}

function filterTable(tableData, col, query) {
  var result = [];
  for (let i = 0; i < tableData.length; i++) {
    if (tableData[i][col].toLowerCase().includes(query.toLowerCase())) {
      result.push(tableData[i]);
    }
  }
  return result;
}

function clipTable(tableData, col, min, max) {
  var result = [];
  var minF = parseFloat(min);
  var maxF = parseFloat(max);
  
  for (let i = 0; i < tableData.length; i++) {
    
    let value = parseFloat(tableData[i][col]);
    if ((isNaN(minF) | value >= minF ) & (isNaN(maxF) | value <= maxF)) {
      result.push(tableData[i]);
    }
    
  }
  return result;
}

function sortTable(tableData, col, buttAction) {
  // If button clicked and we had already sorted on this column, toggle sort asc/desc
  var sortAsc = actionData[col].sortAsc ^ (buttAction & actionData[col].sorted);
  for (let i = 0; i < headers.length; i++) {
    actionData[i].sorted = false;
  }
  actionData[col].sorted = true;
  actionData[col].sortAsc = sortAsc;
  
  if (tableData == null) {
    tableData = table2data(tableBody);
  }

  if (actionData[col].dataType == "numeric") {
    tableData.sort((a, b) => {
      if (parseFloat(a[col]) > parseFloat(b[col]) & sortAsc) {
        return 1;
      }
      if (parseFloat(a[col]) < parseFloat(b[col]) & !sortAsc) {
        return 1;
      }
      return -1;
    });
  } else {
    tableData.sort((a, b) => {
      if (a[col] > b[col] & sortAsc) {
        return 1;
      }
      if (a[col] < b[col] & !sortAsc) {
        return 1;
      }
      return -1;
    });
  }
  
  updateTable(tableData);
}

function table2data(tableBody) {
  const tableData = [];
  tableBody.querySelectorAll('tr')
  .forEach(row => {
    const rowData = [];
    row.querySelectorAll('td')
    .forEach(cell => {
      rowData.push(cell.innerText);
    })
    tableData.push(rowData);
  });
  return tableData;
}

function updateTable(tableData) {
  
  headers.forEach((cell, i) => {
    if (actionData[i].sorted) {
      cell.className = "sorted";
    } else {
      cell.className = "";
    }
  });
  
  tableBody.innerHTML = "";
  
  tableData.forEach((row, i) => {
    var tr = document.createElement('tr');
    row.forEach((cell, j) => {
      var td = document.createElement('td');
      td.innerText = cell;
      if (actionData[j].sorted) {
        td.className = "sorted";
      }
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
  if (tableBody.innerHTML == "") {
    noResults = document.createElement('div');
    noResults.textContent = "No Results";
    noResults.className = "no-results";
    tableWrapper.appendChild(noResults);
  } else {
    let noResults = document.querySelector('.no-results');
    if (noResults != null) {
      noResults.parentNode.removeChild(noResults);
    }
  }
}
