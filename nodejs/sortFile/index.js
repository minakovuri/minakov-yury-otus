const fs = require('fs')

const splitStream = require('./src/splitStream')
const mergeStreams = require('./src/mergeStreams')

const inputFilePath = process.argv[2]
const outputFilePath = process.argv[3]

;(async () => {
    const inputStream = fs.createReadStream(inputFilePath)
    const outputStream = fs.createWriteStream(outputFilePath)

    console.log('-- start splitting file -- ')
    const streams = await splitStream(inputStream)
    console.log('-- end splitting file -- ')

    console.log('-- start merging -- ')
    await mergeStreams(streams, outputStream)
    console.log('-- end merging -- ')
})()