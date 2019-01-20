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

const sortData = function(modules) {
  modules[0].forEach(cellData => {
    const cell = filterCell(cellData);
    console.log(cell);
  });
}

module.exports = sortData;