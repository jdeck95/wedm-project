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

let filename = '';

const getFilename = function(){
  return filename;
}

const sortData = function(module) {
  let sortedData = [];
  let pruefungsleistung = '';
  let ectsPunkte = '';

  for (let i = 0; i < module.length; i++){
    const cellData = module[i];
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
        filename = cell[4];
        formattedCell = {
          header: `===== ${cell[1]} ${cell[2]} =====\n`,
          items: [`${cell[3]} ${cell[4]} ${cell[5]}`]
        };
        break;
      case 'Zelle3':
      case 'Zelle6':
      case 'Zelle7':
      case 'Zelle8': //empfohlene voraussetzungen
      case 'Zelle9':
      case 'Zelle11':
      case 'Zelle16':
      let itemsSliced100 = cell.slice(2);
        let items100 = itemsSliced100.map(item => {
          return `* ${item}`;
        });
        formattedCell = {
          header: `===== ${cell[1]} =====\n`,
          items: items100
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
          items : [`| ${cell[2]} | ${cell[4]} | ${cell[5]} |\n`]
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
          items: [`| ${cell[1]} ${cell[2]} | ${cell[3]} | ${cell[4]} |`]
        }
        pruefungsleistung = pruefungsleistung.concat(cell[5], cell[6]);
        //TODO: fix calculation of ECTS-Points
        //ectsPunkte = ectsPunkte.concat(cell[7]);
        break;
      case 'Zelle14': 
        formattedCell = {
          header: '',
          items: [`| ${cell[1]} | ${cell[2]} | ${cell[3]} |\n`, pruefungsleistung, ectsPunkte]
        }
        break;
      case 'Zelle15': 
        let itemsSliced15 = cell.slice(2);
        let items15 = itemsSliced15.map(item => {
          return `* ${item}`;
        });
        formattedCell = {
          header: `===== ${cell[1]} =====\n`,
          items: items15
        }
        break;
    }
    sortedData.push(formattedCell);
  };

  return {filename, sortedData};
}

module.exports = {sortData, getFilename};