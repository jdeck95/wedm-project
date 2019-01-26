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
  let header = headerText;
  return header;
}

const createItems = function(data){
  let items = [];
  data.forEach(text => {
    items.push(text);
  });
  return items;
}

const sortData = function(modules) {
  let sortedData = [];
  let pruefungsleistung = '';
  let ectsPunkte = '';

  for (let i = 0; i < modules[0].length; i++){
    const cellData = modules[0][i];
    const cell = filterCell(cellData);
    let formattedCell = {
      header: '',
      items: []
    };
    switch(cell[0]) {
      case 'Zelle1': 
        formattedCell = {
          header: `===== ${cell[1]} ${cell[2]} =====\n`,
          items: [`${cell[3]} ${cell[4]}`]
        };
        break;
      case 'Zelle2':
        formattedCell = {
          header: `===== ${cell[1]} ${cell[2]} =====\n`,
          items: [`${cell[3]} ${cell[4]} ${cell[5]}`]
        };
        break;
      case 'Zelle3':
      case 'Zelle6':
      case 'Zelle7':
      case 'Zelle8':
      case 'Zelle9':
      case 'Zelle11':
      case 'Zelle16':
        formattedCell = {
          header: `===== ${cell[1]} =====\n`,
          items: [cell[2]]
        }
        break;
      case 'Zelle4':
        formattedCell = {
          header: `===== Regelsemester + ECTS-Punkte =====\n`,
          items: [`| ${cell[2]} | ${cell[3]} | ${cell[4]} |`]
        }
        break;
      case 'Zelle5':
        formattedCell = {
          header: '',
          items : [`| ${cell[2]} | ${cell[3]} | ${cell[4]} |\n`]
        };
        break;
      case 'Zelle10':
        let itemsSliced = cell.slice(2);
        let i = 0;
        let items = itemsSliced.map(item => {
          i++;
          return `${i}. ${item}`;
        });
        formattedCell = {
          header: `===== ${cell[1]} =====\n`,
          items
        }
        break;
      case 'Zelle12': 
        formattedCell = {
          header: `===== ${cell[1]} ${cell[2]} =====\n`,
          items: [`| ${cell[3]} | ${cell[4]} | ${cell[5]} |`]
        }
        pruefungsleistung = cell[6];
        ectsPunkte = cell[7];
        break;
      case 'Zelle13': 
        formattedCell = {
          header: '',
          items: [`| ${cell[1]} ${cell[2]} | ${cell[3]} ${cell[4]} ${cell[5]} | ${cell[6]} |`]
        }
        pruefungsleistung = pruefungsleistung.concat(cell[7], cell[8]);
        ectsPunkte = ectsPunkte.concat(cell[9]);
        break;
      case 'Zelle14': 
      console.log(cell);
        formattedCell = {
          header: '',
          items: [`| ${cell[1]} | ${cell[2]} ${cell[3]} ${cell[4]} | ${cell[5]} |\n`, pruefungsleistung, ectsPunkte]
        }
        break;
      case 'Zelle15': 
        let itemsSliced15 = cell.slice(2);
        let items15 = itemsSliced15.map(item => {
          return `* ${item}`;
        });
        formattedCell = {
          header: `===== ${cell[1]} =====\n`,
          items15
        }
        break;
    }
    sortedData.push(formattedCell);
  };
  // 
  // modules[0].forEach(cellData => {
  //   const cell = filterCell(cellData);
  //   let formattedCell = {
  //     header: createHeader(cell[1]),
  //     items: createItems(cell.slice(2))
  //   };
  //   sortedData.push(formattedCell);
  // });

  return sortedData;
}

module.exports = sortData;