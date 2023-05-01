import {Component} from "../../core/Component"

import './Button.css'

class Button extends Component {
    private label: string
    private onClick: () => void

    constructor(label: string, onClick: () => void) {
        super()

        this.label = label
        this.onClick = onClick
    }

    render() {
        return this.html`
<div class="button" onclick=${this.onClick} ondisconnected=${this}>
    ${this.label}
</div>`
    }
}

export {
    Button,
}