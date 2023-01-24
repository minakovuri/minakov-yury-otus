const getPath = require('./getPath')

describe('#getPath tests', () => {
    document.body.innerHTML = `
<div class="someclass">
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <div id="someId"></div>
</div>
<div></div>`

    it('get div element path', () => {
        const querySelector = document.querySelector('div.someclass')

        const path = getPath(
            querySelector,
        )

        const querySelectorAll = document.querySelectorAll(path)

        expect(
            Array.from(querySelectorAll),
        ).toEqual(
            [querySelector],
        )
    })

    it('get ul element path', () => {
        const querySelector = document.querySelector('div.someclass ul')

        const path = getPath(
            querySelector,
        )

        const querySelectorAll = document.querySelectorAll(path)

        expect(
            Array.from(querySelectorAll),
        ).toEqual(
            [querySelector],
        )
    })

    it('get first li element path', () => {
        const querySelector = document.querySelector('div.someclass ul li:first-child')

        const path = getPath(
            querySelector,
        )

        const querySelectorAll = document.querySelectorAll(path)

        expect(
            Array.from(querySelectorAll),
        ).toEqual(
            [querySelector],
        )
    })

    it('get second li element path', () => {
        const querySelector = document.querySelector('div.someclass ul li:nth-child(2)')

        const path = getPath(
            querySelector,
        )

        const querySelectorAll = document.querySelectorAll(path)

        expect(
            Array.from(querySelectorAll),
        ).toEqual(
            [querySelector],
        )
    })

    it('get third li element path', () => {
        const querySelector = document.querySelector('div.someclass ul li:nth-child(3)')

        const path = getPath(
            querySelector,
        )

        const querySelectorAll = document.querySelectorAll(path)

        expect(
            Array.from(querySelectorAll),
        ).toEqual(
            [querySelector],
        )
    })

    it('get div with id element path', () => {
        const querySelector = document.querySelector('#someId')

        const path = getPath(
            querySelector,
        )

        const querySelectorAll = document.querySelectorAll(path)

        expect(
            Array.from(querySelectorAll),
        ).toEqual(
            [querySelector],
        )
    })
})