import {Component} from "../../core/Component"
import {Button} from "../button/Button"

import './Menu.css'

enum MenuEvents {
    AddTriangle = 'addTriangle',
    AddRectangle = 'addRectangle',
    AddEllipse = 'addEllipse',
    DeleteShape = 'deleteShape'
} 

class Menu extends Component {
    onAddTriangle(handler: () => void) {
        this.addEventListener(MenuEvents.AddTriangle, handler)
    }

    onAddRectangle(handler: () => void) {
        this.addEventListener(MenuEvents.AddRectangle, handler)
    }

    onAddEllipse(handler: () => void) {
        this.addEventListener(MenuEvents.AddEllipse, handler)
    }

    onDeleteShape(handler: () => void) {
        this.addEventListener(MenuEvents.DeleteShape, handler)
    }

    render() {
        return this.html`
<div class="menu" ondisconnected=${this}>
    ${ new Button('Add triangle', () => this.dispatchEvent(MenuEvents.AddTriangle)) }
    ${ new Button('Add rectangle', () => this.dispatchEvent(MenuEvents.AddRectangle)) }
    ${ new Button('Add ellipse', () => this.dispatchEvent(MenuEvents.AddEllipse)) }
    ${ new Button('Delete', () => this.dispatchEvent(MenuEvents.DeleteShape)) }
</div>`
    }
}

export {
    Menu,
}