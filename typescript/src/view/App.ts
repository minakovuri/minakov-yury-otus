import {Component} from "hyperhtml"
import {Menu} from "./menu/Menu"
import {Document} from './document/Document'
import {Rect} from "../model/types/Rect"
import {ShapeType} from "../model/types/ShapeType"

class App extends Component {
    private menu: Menu = new Menu()
    private document: Document = new Document()

    onAddTriangle(handler: () => void) {
        this.menu.onAddTriangle(handler)
    }

    onAddRectangle(handler: () => void) {
        this.menu.onAddRectangle(handler)
    }

    onAddEllipse(handler: () => void) {
        this.menu.onAddEllipse(handler)
    }

    onUpdateShapeRect(handler: (details: ({shapeId: string, newRect: Rect})) => void) {
        this.document.onUpdateShape(handler)
    }

    onDeleteShape(handler: () => void) {
        this.document.onDeleteShape(handler)
        this.menu.onDeleteShape(handler)
    }

    insertShape(shapeId: string, rect: Rect, shapeType: ShapeType) {
        this.document.addShape(shapeId, rect, shapeType)
    }

    updateShape(shapeId: string, rect: Rect) {
        this.document.updateShape(shapeId, rect)
    }

    removeShape(shapeId: string) {
        this.document.removeShape(shapeId)
    }

    getSelectedShapeId(): string {
        return this.document.getSelectedShapeId()
    }

    render() {
        return this.html`
<div ondisconnected=${this}>
    ${this.menu}
    ${this.document}
</div>`
    }
}

export {
    App,
}