import {EventDispatcher} from "../core/EventDispatcher"
import {v4 as generateUUID} from 'uuid'
import {Rect} from "./types/Rect"
import {ShapeType} from "./types/ShapeType"

enum ShapeEvents {
    UpdateRect = 'updateRect'
}

class Shape extends EventDispatcher {
    private id: string
    private rect: Rect
    private type: ShapeType

    constructor(rect: Rect, type: ShapeType) {
        super()

        this.id = generateUUID()
        this.rect = rect
        this.type = type
    }

    getId(): string {
        return this.id
    }

    getType(): ShapeType {
        return this.type
    }

    getRect(): Rect {
        return this.rect
    }

    setRect(rect: Rect) {
        this.rect = rect
        this.dispatch(ShapeEvents.UpdateRect)
    }

    onUpdateRect(handler: () => void) {
        this.addListener(ShapeEvents.UpdateRect, handler)
    }
}

export {
    Shape,
}