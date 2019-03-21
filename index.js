const fs = require('fs');
const util = require('util');
const DOMParser = require('xmldom').DOMParser;
const getData = require('./getData');
const {sortData, getFilename, getModuleArt} = require('./sortData');
const createFile = require('./createFile');

const readFile = util.promisify(fs.readFile);
const parser = new DOMParser();

async function readFodtFile() {
    const data = await readFile('files/ModulhandbuecherMIB.fodt');
    const xml = data.toString();
    const xmlDoc = parser.parseFromString(xml);
    return xmlDoc;
}

function filterCell(cell){
    let filteredCell = cell;
      if (cell[0] !== 'Zelle5') {
        filteredCell = cell.filter(el => {
          const trimedEl = el.trim();
          return trimedEl != '';
        })
      }
      return filteredCell;
  }

function getFilenames(modules) {
    let filenames = [];

    modules.forEach(module => {
        module.forEach(cell => {
            cell = filterCell(cell);
            if (cell[0] == 'Zelle2') {
                filenames.push(cell[4].trim());
            }
        })
    });

    return filenames;
}

async function run() {
    const xml = await readFodtFile();
    const modules = await getData(xml);
    const filenames = getFilenames(modules);
    const moduleList = [];

    modules.forEach(module => {
        const sortedData = sortData(module, filenames)['sortedData'];
        const filename = getFilename();
        const moduleArt = getModuleArt();
        createFile(sortedData, filename);
        moduleList.push({moduleArt, filename});
    });

    console.log('Files created');
}

run();