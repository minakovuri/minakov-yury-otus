const readline = require('readline')
const {PassThrough} = require('stream')

const MAX_STREAM_VALUES_COUNT = 1000000

function sortNumbers(numbers) {
    numbers.sort((a, b) => a - b)
}

function writeToStream(stream, numbers) {
    sortNumbers(numbers)

    for (const number of numbers) {
        stream.write(`${number}\n`)
    }

    stream.end()
}

async function splitStream(inputStream) {
    const readlineInterface = readline.createInterface({ input: inputStream, crlfDelay: Infinity })

    const numbersFromInputStream = []

    const outputStreams = []

    for await (let line of readlineInterface) {
        numbersFromInputStream.push(parseInt(line))

        if (numbersFromInputStream.length > MAX_STREAM_VALUES_COUNT) {
            const outputStream = new PassThrough()
            writeToStream(outputStream, numbersFromInputStream)
            outputStreams.push(outputStream)

            numbersFromInputStream.length = 0
        }
    }

    if (numbersFromInputStream.length) {
        const outputStream = new PassThrough()

        writeToStream(outputStream, numbersFromInputStream)
        outputStreams.push(outputStream)
    }

    return outputStreams
}

module.exports = splitStream