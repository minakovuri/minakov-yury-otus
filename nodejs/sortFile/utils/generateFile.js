const fs = require("fs");
const path = require('path')

const fileSize = process.argv[2]
const filePath = process.argv[3]

const writer = fs.createWriteStream(path.join(__dirname, filePath))

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

for (let i = 0; i < fileSize; i++) {
    const number = getRandomInt(0, fileSize)
    writer.write(`${number}\n`)
}

writer.end()