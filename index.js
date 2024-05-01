const fs = require('fs');

function merge_csvs(inputFiles, options) {

    //setting up default options.
    let { delimiter = ',', wrapper = '"', newlineSeperator = '\r\n', outputPath = 'output.csv' } = options;

    let readStreams = [];

    inputFiles.forEach(filePath => {
        let readStream = fs.createReadStream(`${filePath}`, 'utf-8');
        readStreams.push(readStream);
    });

    let writeStream = fs.createWriteStream(outputPath, 'utf-8');

    writeStream.on('finish', () => {
        console.log(`File merged and written successfully at ${outputPath}`);
    });

    let headers = [];

    processStream(0);

    function processStream(index = 0) {

        let isFirstChunk = true;

        if (index >= readStreams.length) {
            writeStream.end();
            return;
        }

        let readStream = readStreams[index];

        console.log(`Processing ${index + 1} : ${readStream.path}`);

        readStream.on('end', () => {
            index = index + 1;
            processStream(index);

        });

        readStream.on('data', (chunk) => {

            //split data on new line.
            let lines = chunk.split(newlineSeperator);

            let firstLine = null;

            if (isFirstChunk) {
                isFirstChunk = false;
                firstLine = lines.shift();
            }

            //generate headers.
            if (!headers.length) {
                headers = processLine(firstLine, delimiter, wrapper);
                writeStream.write(headers.join(`${delimiter}`));
            }
            writeStream.write(`${newlineSeperator}`);
            writeStream.write(lines.join(`${newlineSeperator}`));

        });
    }

    function processLine(line, delimiter = ',', wrapper = '"') {
        let values = []; let str = ''; let wrapStart = false;
        for (let i = 0; i < line.length; i++) {
            if (line[i] == wrapper) {
                wrapStart = !wrapStart;
            }
            else if (!wrapStart && line[i] == delimiter) {
                values.push(str);
                str = '';
            } else str += line[i];
        }
        values.push(str); //last item.
        return values;
    }
}

module.exports = merge_csvs;