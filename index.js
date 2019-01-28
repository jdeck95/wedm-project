const fs = require('fs');
const util = require('util');
const DOMParser = require('xmldom').DOMParser;
const getData = require('./getData');
const {sortData, getFilename} = require('./sortData');
const createFile = require('./createFile');

const readFile = util.promisify(fs.readFile);
const parser = new DOMParser();

async function readFodtFile() {
    const data = await readFile('files/ModulhandbuecherMIB.fodt');
    const xml = data.toString();
    const xmlDoc = parser.parseFromString(xml);
    return xmlDoc;
}

async function run() {
    const xml = await readFodtFile();
    const modules = await getData(xml);

    modules.forEach(module => {
        const sortedData = sortData(module)['sortedData'];
        const filename = getFilename();
        createFile(sortedData, filename);
    });

    console.log('Files created');
}

run();