import {Rect} from "../../model/types/Rect"
import { ShapeType } from "../../model/types/ShapeType"
import {Ellipse} from "./Ellipse"
import {Rectangle} from "./Rectangle"
import {Shape} from "./Shape"
import {Triangle} from "./Triangle"

function createShape(id: string, rect: Rect, type: ShapeType): Shape {
    switch (type) {
        case ShapeType.Triangle:
            return new Triangle(id, rect)
        case ShapeType.Rectangle:
            return new Rectangle(id, rect)
        case ShapeType.Ellipse:
            return new Ellipse(id, rect)
        default:
            throw new Error()
    }
}

export {
    createShape,
}