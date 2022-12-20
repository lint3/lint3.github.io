// Adopted from user "Tom P" on Stack Overflow: https://stackoverflow.com/a/57080195


const table = document.querySelector('.sortable');

table.querySelectorAll('th')
  .forEach((element, columnNo) => {
    element.addEventListener('click', event => {
      sortTable(table, columnNo);
    })
  });

function sortTable(table, sortColumn) {  
  const headers = table.querySelectorAll('th');
  const tableBody = table.querySelector('tbody');
  const tableData = table2data(tableBody);
  
  var colClass = headers[sortColumn].className;
  var colId = headers[sortColumn].id;
  var sortMode = "asc";
  if (colClass.includes("asc") & colId == "sorted") {sortMode = "desc";}
  
  var dataType = "alpha";
  if (colClass.includes("numeric")) {dataType = "numeric";}
  
  if (dataType == "numeric") {
    tableData.sort((a, b) => {
      if (parseFloat(a[sortColumn]) > parseFloat(b[sortColumn]) & sortMode == "asc") {
        return 1;
      }
      if (parseFloat(a[sortColumn]) < parseFloat(b[sortColumn]) & sortMode == "desc") {
        return 1;
      }
      return -1;
    });
  } else {
    tableData.sort((a, b) => {
      if (a[sortColumn] > b[sortColumn] & sortMode == "asc") {
        return 1;
      }
      if (a[sortColumn] < b[sortColumn] & sortMode == "desc") {
        return 1;
      }
      return -1;
    });
  }
  
  // Clear sorted id for other cols
  headers.forEach(cell => {
    cell.id = "";
  });
  
  headers[sortColumn].id = "sorted";
  headers[sortColumn].className = sortMode + " " + dataType;
  
  data2table(tableBody, tableData, sortColumn);
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


function data2table(tableBody, tableData, sortColumn) {
  tableBody.querySelectorAll('tr')
    .forEach((row, i) => {
      const rowData = tableData[i];
      row.querySelectorAll('td')
        .forEach((cell, j) => {
          cell.innerText = rowData[j];
          if (j == sortColumn) { cell.id = 'sorted'; }
          else { cell.id = ""; }
        })
    });
}


























