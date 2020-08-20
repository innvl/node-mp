import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const inputFile = './csv/nodejs-hw1-ex1.csv';
const outputFile = `./csv-to-json${new Date().toDateString()}.txt`;

pipeline(
    fs.createReadStream(inputFile),
    csv(),
    fs.createWriteStream(outputFile),
    (error) => {
        if (error) {
            console.log(`Someting went wrong: ${error}`);
        } else {
            console.log('Finished');
        }
    }
)



