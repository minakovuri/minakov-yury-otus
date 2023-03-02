const readline = require('readline')
const {pipeline} = require('stream')

// стримы должны быть предварительно отсортированы
async function mergeStreams(inputStreams, outStream) {
    const readlineStreams = inputStreams.map(
        inputStream => readline.createInterface({input: inputStream, crlfDelay: Infinity})
    )

    // получаем асинхронные итераторы у каждого стрима
    const readlineIterators = readlineStreams.map(
        readlineStream => readlineStream[Symbol.asyncIterator]()
    )

    // получаем первые числа из всех стримов
    const currentIterationValues = await Promise.all(
        readlineIterators.map(result => result.next().then(data => parseInt(data.value)))
    );

    async function* generateMinValue() {
        while (readlineIterators.length) {
            // находим минимальное значение из всех текущих считанных из стримов чисел
            const minValue = Math.min(...currentIterationValues)

            // возвращаем минимальное значение
            yield `${minValue}\n`

            // находим индекс итератора стрима с минимальным числом
            const minValueIteratorIndex = currentIterationValues.indexOf(minValue)

            // получаем следующий элемент из стрима, в котором нашли минимальное число
            const result = await readlineIterators[minValueIteratorIndex].next()

            if (result.done) {
                // если данные в стриме кончились - удаляем его итератор из обрабатываемых и из обрабатываемых чисел
                currentIterationValues.splice(minValueIteratorIndex, 1)
                readlineIterators.splice(minValueIteratorIndex, 1)
            }
            else {
                // заменяем минимальное число из обработанного стрима на новое число
                currentIterationValues[minValueIteratorIndex] = parseInt(result.value)
            }
        }
    }

    return pipeline(
        generateMinValue,
        outStream,
        (err) => {
            if (err) {
                console.error(err)
            }
        }
    )
}

module.exports = mergeStreams
