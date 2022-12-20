// Adopted from user "Tom P" on Stack Overflow: https://stackoverflow.com/a/57080195


const table = document.querySelector('.sortable');

table.querySelectorAll('th')
  .forEach((element, columnNo) => {
    element.addEventListener('click', event => {
      sortTable(table, columnNo);
    })
  });

function sortTable(table, sortColumn) {
  const tableBody = table.querySelector('tbody');
  const tableData = table2data(tableBody);
  
  tableData.sort((a, b) => {
    if (a[sortColumn] > b[sortColumn]) {
      return 1;
    }
    return -1;
  });
  
  // Style sorted header
  table.querySelectorAll('th')[sortColumn].className = "sorted " + "asc";
  
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
          if (j == sortColumn) { cell.className = 'sorted'; }
        })
    });
}


























