import * as fs from 'fs';
import * as csvParser from 'csv-parser';
import * as path from 'path';
import * as iconv from 'iconv-lite';

const absoluteFilePath = '/Users/jeonghyein/Downloads/seoulChildCard.csv';
const jsonData = [];

fs.createReadStream(absoluteFilePath)
//   .pipe(iconv.decodeStream('utf-8'))
  .pipe(iconv.decodeStream('euc-kr'))
  .pipe(csvParser())
  .on('data', (row) => {
    jsonData.push(row);
  })
  .on('end', () => {
    console.log(jsonData);
  });
