"use strict";
exports.__esModule = true;
var fs = require("fs");
var csvParser = require("csv-parser");
var iconv = require("iconv-lite");
var absoluteFilePath = '/Users/jeonghyein/Downloads/seoulChildCard.csv';
var jsonData = [];
fs.createReadStream(absoluteFilePath)
    //   .pipe(iconv.decodeStream('utf-8'))
    .pipe(iconv.decodeStream('euc-kr'))
    .pipe(csvParser())
    .on('data', function (row) {
    jsonData.push(row);
})
    .on('end', function () {
    console.log(jsonData);
});
