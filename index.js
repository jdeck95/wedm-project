const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const DOMParser = require('xmldom').DOMParser;

const readFile = util.promisify(fs.readFile);
const parseString = util.promisify(xml2js.parseString);
const parser = new DOMParser();

async function readFodtFile() {
    const data = await readFile('Modulhandbuecher.fodt');
    const xml = data.toString();
    const result = await parseString(xml);
    const xmlDoc = parser.parseFromString(xml,"text/xml");
    return xmlDoc;
}

async function run (){
    const result = await readFodtFile();
    const tables = result.getElementsByTagName('table:table');
    
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const tableRows = table.getElementsByTagName('table:table-row');
        for (let j = 0; j < tableRows.length; j++) {
            const tableRow = tableRows[j];
            const tableCells = tableRow.getElementsByTagName('table:table-cell');
            for (let k = 0; k < tableCells.length; k++) {
                const tableCell = tableCells[k];
                const textPs = tableCell.getElementsByTagName('text:p');
                for (let m = 0; m < textPs.length; m++) {
                    const textP = textPs[m];
                    const spans = textP.getElementsByTagName('text:span');
                    for (let n = 0; n < spans.length; n++) {
                        console.log(spans[n]['lastChild']['data']);
                    }
                }
            }
        }
    } 
}

run();
