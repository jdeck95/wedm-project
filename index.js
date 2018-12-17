const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const parseString = util.promisify(xml2js.parseString);

async function readFodtFile() {
    const data = await readFile('Modulhandbuecher.fodt');
    const xml = data.toString();
    const result = await parseString(xml);
    return result;
}

async function run (){
    const result = await readFodtFile();
    //console.log(result);
    const modules = result['office:document']['office:body'][0]['office:text'][0]['table:table'];
    console.log(modules);
    modules.forEach(module => {
        console.log(module['$']);
    });
}

run();
