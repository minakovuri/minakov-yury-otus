import {Component} from "../../core/Component"
import {KeyCodes} from "../../core/KeyCodes"
import {Rect} from "../../model/types/Rect"
import {ShapeType} from "../../model/types/ShapeType"
import {createShape} from '../shape/createShape'
import {Shape} from "../shape/Shape"
import {Frame} from "../frame/Frame"

import './Document.css'

const DocumentOptions = {
    WIDTH: 1200,
    HEIGHT: 600,
}

enum DocumentEvents {
    UpdateShape = 'updateShape',
    DeleteShape = 'deleteShape',
}

type State = {
    shapes: Shape[],
    frames: Frame[],
    selectedShapeId: string|null,
}

class Document extends Component<State> {
    get defaultState(): State {
        return {
            shapes: [],
            frames: [],
            selectedShapeId: null,
        };
    }

    addShape(id: string, rect: Rect, type: ShapeType) {
        const frame = new Frame(id, rect)
        const shape = createShape(id, rect, type)

        const shapeId = shape.getId()

        frame.onResize(({ left, top, width, height }) => {
            const currentRect = shape.getRect()

            const bottom = top + height
            const right = left + width

            if (top <= 0) {
                top = 1
                height = currentRect.height
            } else if (bottom >= DocumentOptions.HEIGHT) {
                height = DocumentOptions.HEIGHT - 1 - top
            }

            if (left <= 0) {
                left = 1
                width = currentRect.width
            } else if (right >= DocumentOptions.WIDTH) {
                width = DocumentOptions.WIDTH - 1 - left
            }

            const newRect = {
                top,
                left,
                width,
                height,
            }

            this.dispatchEvent(DocumentEvents.UpdateShape, {
                shapeId,
                newRect,
            })
        })

        shape.onClick(() => {
            for (const currFrame of this.state.frames) {
                currFrame.getEnabled() && currFrame.setEnabled(false)
            }

            !frame.getEnabled() && frame.setEnabled(true)

            this.setState({
                selectedShapeId: shapeId,
            })
        })

        shape.onDragged(({ top, left }) => {
            const currentRect = shape.getRect()

            const bottom = top + currentRect.height
            const right = left + currentRect.width

            if (top <= 0) {
                top = 1
            } else if (bottom >= DocumentOptions.HEIGHT) {
                top = DocumentOptions.HEIGHT - currentRect.height - 1
            }

            if (left <= 0) {
                left = 1
            } else if (right >= DocumentOptions.WIDTH) {
                left = DocumentOptions.WIDTH - currentRect.width - 1
            }

            const newRect = {
                top,
                left,
                width: currentRect.width,
                height: currentRect.height,
            }

            this.dispatchEvent(DocumentEvents.UpdateShape, {
                shapeId,
                newRect,
            })
        })

        this.setState({
            shapes: this.state.shapes.concat(shape),
            frames: this.state.frames.concat(frame),
        })
    }

    updateShape(shapeId: string, rect: Rect) {
        const frames = this.state.frames
        const shapes = this.state.shapes

        const frameIndex = frames.findIndex(frame => frame.getShapeId() == shapeId)
        if (frameIndex == -1) {
            throw new Error(`cannot find frame for shape with id : ${shapeId}`)
        }
        frames[frameIndex].setRect(rect)

        const shapeIndex = shapes.findIndex(shape => shape.getId() == shapeId)
        if (shapeIndex == -1) {
            throw new Error(`cannot find shape with id : ${shapeId}`)
        }
        shapes[shapeIndex].setRect(rect)

        this.setState({
            shapes,
            frames,
        })
    }

    removeShape(shapeId: string) {
        const frames = this.state.frames
        const shapes = this.state.shapes

        const frameIndex = frames.findIndex(frame => frame.getShapeId() == shapeId)
        if (frameIndex == -1) {
            throw new Error(`cannot find frame for shape with id : ${shapeId}`)
        }
        frames.splice(frameIndex, 1)

        const shapeIndex = shapes.findIndex(shape => shape.getId() == shapeId)
        if (shapeIndex == -1) {
            throw new Error(`cannot find shape with id : ${shapeId}`)
        }
        shapes.splice(shapeIndex, 1)

        const selectedShapeId = this.state.selectedShapeId === shapeId
            ? null
            : this.state.selectedShapeId

        this.setState({
            shapes,
            frames,
            selectedShapeId,
        })
    }

    getSelectedShapeId() {
        return this.state.selectedShapeId
    }

    onUpdateShape(handler: (details: ({shapeId: string, newRect: Rect})) => void) {
        this.addEventListener(DocumentEvents.UpdateShape, handler)
    }

    onDeleteShape(handler: () => void) {
        this.addEventListener(DocumentEvents.DeleteShape, handler)
    }

    onmousedown(e: MouseEvent) {
        if (e.defaultPrevented) {
            return
        }

        for (const frame of this.state.frames) {
            frame.getEnabled() && frame.setEnabled(false)
        }

        this.setState({
            selectedShapeId: null,
        })
    }

    private getStyles() {
        return {
            width: DocumentOptions.WIDTH,
            height: DocumentOptions.HEIGHT,
        }
    }

    render() {
        return this.html`
<div
    class="document"
    style=${this.getStyles()}
    onmousedown=${this}
    ondisconnected=${this}
>
    <div class="frames-layer">
        ${this.state.frames.map(frame => frame.render())}
    </div>
    <svg class="shapes-layer">
        ${this.state.shapes.map(shape => shape.render())}
    </svg>
</div>`
    }
}

export {
    Document,
}