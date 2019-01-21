const filterCell = function(cell){
  let filteredCell = cell;
    if (cell[0] !== 'Zelle5') {
      filteredCell = cell.filter(el => {
        const trimedEl = el.trim();
        return trimedEl != '';
      })
    }
    return filteredCell;
}

const createHeader = function(headerText){
  let header = `====== ${headerText}======`;
  return header;
}

const createItems = function(data){
  let items = [];
  data.forEach(text => {
    items.push(`* ${text}`);
  });
  return items;
}

const sortData = function(modules) {
  let sortedData = [];
  modules[0].forEach(cellData => {
    const cell = filterCell(cellData);
    let formattedCell = {
      header: createHeader(cell[1]),
      items: createItems(cell.slice(2))
    };
    sortedData.push(formattedCell);
  });

  return sortedData;
}

module.exports = sortData;