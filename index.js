const fs = require('fs');
const util = require('util');
const DOMParser = require('xmldom').DOMParser;

const readFile = util.promisify(fs.readFile);
const parser = new DOMParser();

async function readFodtFile() {
    const data = await readFile('Modulhandbuecher.fodt');
    const xml = data.toString();
    const xmlDoc = parser.parseFromString(xml);
    return xmlDoc;
}

async function getData (){
    const result = await readFodtFile();
    const tables = result.getElementsByTagName('table:table');
    let moduleList = [];
    
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        const module = [];
        const tableRows = table.getElementsByTagName('table:table-row');
        for (let j = 0; j < tableRows.length; j++) {
            const tableRow = tableRows[j];
            const tableCells = tableRow.getElementsByTagName('table:table-cell');
            module.push(`Zelle ${j}`);
            for (let k = 0; k < tableCells.length; k++) {
                const tableCell = tableCells[k];
                const textPs = tableCell.getElementsByTagName('text:p');
                for (let m = 0; m < textPs.length; m++) {
                    const textP = textPs[m];
                    const spans = textP.getElementsByTagName('text:span');
                    if (spans.length == 0) {
                        module.push('');
                    }
                    for (let n = 0; n < spans.length; n++) {
                        const span = spans[n]['childNodes']; 
                        let text = '';
                        for (let h = 0; h < span.length; h++) {
                            text = text.concat(span[h]['data'], " ");
                        }
                        text = text.replace('undefined', '');
                        module.push(text);
                    }
                }
            }
        }
        moduleList.push(module);
    } 
    return moduleList;
}

async function run() {
    const modules = await getData();
    console.log(modules[0]);
}

run();