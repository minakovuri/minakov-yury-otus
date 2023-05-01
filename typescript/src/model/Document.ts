import {EventDispatcher} from "../core/EventDispatcher"
import {Shape} from './Shape'
import {Rect} from "./types/Rect"
import {ShapeType} from "./types/ShapeType"

enum DocumentEvents {
    AddShape = 'addShape',
    UpdateShape = 'updateShape',
    RemoveShape = 'removeShape',
}

class Document extends EventDispatcher {
    private shapes: Map<string, Shape> = new Map() 

    getShape(shapeId: string): Shape {
        const shape = this.shapes.get(shapeId)
        if (!shape) {
            throw new Error(`shape with id ${shapeId} is not in document`)
        }
        return shape
    }

    insertShape(rect: Rect, type: ShapeType) {
        const shape = new Shape(rect, type)
        shape.onUpdateRect(() => 
            this.dispatch(DocumentEvents.UpdateShape, {
                shapeId,
            })
        )

        const shapeId = shape.getId()

        this.shapes.set(shapeId, shape)

        this.dispatch(DocumentEvents.AddShape, {
            shapeId,
        })
    }

    changeShapeRect(shapeId: string, rect: Rect) {
        const shape = this.getShape(shapeId)
        shape.setRect(rect)
    }

    removeShape(shapeId: string) {
        if (this.shapes.delete(shapeId)) {
            this.dispatch(DocumentEvents.RemoveShape, {
                shapeId,
            })
        }
    }

    onInsertShape(handler: () => void) {
        this.addListener(DocumentEvents.AddShape, handler)
    }

    onUpdateShape(handler: () => void) {
        this.addListener(DocumentEvents.UpdateShape, handler)
    }

    onRemoveShape(handler: () => void) {
        this.addListener(DocumentEvents.RemoveShape, handler)
    }
}

export {
    Document,
}