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
  
  data2table(tableBody, tableData);
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


function data2table(tableBody, tableData) {
  tableBody.querySelectorAll('tr')
    .forEach((row, i) => {
      const rowData = tableData[i];
      row.querySelectorAll('td')
        .forEach((cell, j) => {
          cell.innerText = rowData[j];
        })
    });
}
