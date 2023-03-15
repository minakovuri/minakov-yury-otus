class MyLeaf extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        const item = JSON.parse(this.getAttribute('item'))

        const style = document.createElement("style")
        style.textContent = `
li {
    list-style-type: circle;
    white-space: nowrap;
    width: fit-content;
    margin-left: 20px;
}`

        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = `
<li>
    Tree leaf, id ${item.id}
</li>`
        shadow.appendChild(style)
    }
}

class MyTree extends HTMLElement {
    connectedCallback() {
        this.render()
    }

    render() {
        const data = JSON.parse(this.getAttribute('data'))

        const style = document.createElement("style")
        style.textContent = `
ul {
    padding-left: 20px;
}

li {
    list-style-type: disc;
}`
        const shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = `
<ul>
    <li>Tree node, id ${data.id}</li>
    ${data.items.map(item => 'items' in item
        ? `<my-tree data='${JSON.stringify(item)}'></my-tree>`
        : `<my-leaf item='${JSON.stringify(item)}'></my-leaf>`
    ).join('')}
</ul>`
        shadow.appendChild(style)
    }
}

customElements.define('my-leaf', MyLeaf)
customElements.define('my-tree', MyTree)