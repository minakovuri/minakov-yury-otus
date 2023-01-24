function getPath(htmlElement) {
    const tagName = htmlElement.tagName.toLowerCase()
    if (tagName === 'body') {
        return 'body'
    }

    let elementPath = ''

    if (htmlElement.id) {
        return `#${htmlElement.id}`
    }
    
    elementPath += tagName

    let nthChildNumber = 1

    let currentElement = htmlElement.prevElementSibling

    while (currentElement) {
        nthChildNumber++
        currentElement = currentElement.prevElementSibling 
    }

    elementPath += `:nth-child(${nthChildNumber})`

    return getPath(htmlElement.parentNode) + ' ' + elementPath
}

module.exports = getPath;