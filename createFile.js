const fs = require('fs');
const util = require('util');
const asyncForEach = require('./helper');

const appendFile = util.promisify(fs.appendFile);

const createFile = async function(sortedData, filename) {
    let cellLength = [];
    filename = filename.trim().split(' ').join('_');
    await asyncForEach(sortedData,async (cell) => {
        let items = cell['header'];
        cellLength.push(cell['items'].length);
        cell['items'].forEach(item => {
            items = items.concat(`${item}\n`);
        });

        await appendFile(`zim/${filename}.txt`, items, (err) => {
            if (err) throw err;
        });
    });

    await appendFile(`zim/${filename}.txt`, '\n', (err) => {
        if (err) throw err;
    });
}

module.exports = createFile;