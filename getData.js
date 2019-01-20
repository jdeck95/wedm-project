async function getData (xml){
  const tables = xml.getElementsByTagName('table:table');
  let moduleList = [];
  
  for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      const module = [];
      const tableRows = table.getElementsByTagName('table:table-row');
      for (let j = 0; j < tableRows.length; j++) {
          const tableRow = tableRows[j];
          const tableCells = tableRow.getElementsByTagName('table:table-cell');
          const cell = [];
          cell.push(`Zelle${j+1}`);
          for (let k = 0; k < tableCells.length; k++) {
              const tableCell = tableCells[k];
              const textPs = tableCell.getElementsByTagName('text:p');
              for (let m = 0; m < textPs.length; m++) {
                  const textP = textPs[m];
                  const spans = textP.getElementsByTagName('text:span');
                  if (spans.length == 0) {
                      cell.push('');
                  }
                  for (let n = 0; n < spans.length; n++) {
                      const span = spans[n]['childNodes']; 
                      let text = '';
                      for (let h = 0; h < span.length; h++) {
                          text = text.concat(span[h]['data'], " ");
                      }
                      text = text.replace('undefined', '');
                      cell.push(text);
                  }
              }
          }
          module.push(cell);
      }
      moduleList.push(module);
  } 
  return moduleList;
}

module.exports = getData;