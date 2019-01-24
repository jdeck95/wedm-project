const fs = require('fs');
const util = require('util');
const asyncForEach = require('./helper');

const appendFile = util.promisify(fs.appendFile);

const createFile = async function(sortedData) {
    asyncForEach(sortedData,async (cell) => {
        let items = `${cell['header']}`;
        cell['items'].forEach(item => {
            items = items.concat(`${item}`);
        });
        items = items.concat('\n');

        await appendFile('zim.txt', items, (err) => {
            if (err) throw err;
        });
    });

    console.log('File created!');
}

module.exports = createFile;