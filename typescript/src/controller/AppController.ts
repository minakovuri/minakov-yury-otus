import {App} from '../view/App'
import {Document} from '../model/Document'
import {Rect} from '../model/types/Rect'
import { ShapeType } from '../model/types/ShapeType'

const defaultShapeRect: Rect = {
    left: 500,
    top: 200,
    width: 200,
    height: 200,
}

class AppController {
    private view: App
    private model: Document = new Document()

    constructor(view: App) {
        this.view = view

        this.initView()
        this.initModel()
    }

    private initView() {
        this.view.onAddTriangle(() => this.model.insertShape(defaultShapeRect, ShapeType.Triangle))
        this.view.onAddRectangle(() => this.model.insertShape(defaultShapeRect, ShapeType.Rectangle))
        this.view.onAddEllipse(() => this.model.insertShape(defaultShapeRect, ShapeType.Ellipse))

        this.view.onUpdateShapeRect(({ shapeId, newRect }) => {
            this.model.changeShapeRect(shapeId, newRect)
        })

        this.view.onDeleteShape(() => {
            const selectedShapeId = this.view.getSelectedShapeId()

            if (selectedShapeId) {
                this.model.removeShape(selectedShapeId)
            }
        })
    }

    private initModel() {
        this.model.onInsertShape(this.insertShapeHandler.bind(this))
        this.model.onUpdateShape(this.changeShapeRectHandler.bind(this))
        this.model.onRemoveShape(this.removeShapeHandler.bind(this))
    }

    private insertShapeHandler({shapeId}: { shapeId: string }) {
        const shape = this.model.getShape(shapeId)

        const shapeType = shape.getType()
        const shapeRect = shape.getRect()

        this.view.insertShape(shapeId, shapeRect, shapeType)
    }

    private changeShapeRectHandler({shapeId}: { shapeId: string }) {
        const shape = this.model.getShape(shapeId)

        const shapeRect = shape.getRect()

        this.view.updateShape(shapeId, shapeRect)
    }

    private removeShapeHandler({shapeId}: { shapeId: string }) {
        this.view.removeShape(shapeId)
    }
}

export {
    AppController,
}