const fs = require('fs');
const util = require('util');
const DOMParser = require('xmldom').DOMParser;
const getData = require('./getData');
const sortData = require('./sortData');

const readFile = util.promisify(fs.readFile);
const parser = new DOMParser();

async function readFodtFile() {
    const data = await readFile('files/Modulhandbuecher.fodt');
    const xml = data.toString();
    const xmlDoc = parser.parseFromString(xml);
    return xmlDoc;
}

async function run() {
    const xml = await readFodtFile();
    const modules = await getData(xml);
    const sortedData = sortData(modules);
    console.log(sortedData);
}

run();