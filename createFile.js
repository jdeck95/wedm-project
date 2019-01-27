const fs = require('fs');
const util = require('util');
const asyncForEach = require('./helper');

const appendFile = util.promisify(fs.appendFile);

const createFile = async function(sortedData, filename) {
    let cellLength = [];
    filename = filename.split(' ').join('_');
    await asyncForEach(sortedData,async (cell) => {
        let items = cell['header'];
        cellLength.push(cell['items'].length);
        cell['items'].forEach(item => {
            items = items.concat(`${item}\n`);
        });
        //items = items.concat('\n');

        await appendFile(`zimFiles/${filename}.txt`, items, (err) => {
            if (err) throw err;
        });
    });

    await appendFile(`zimFiles/${filename}.txt`, '\n', (err) => {
        if (err) throw err;
    });

    console.log(Math.max(...cellLength));
    console.log('File created!');
}

module.exports = createFile;