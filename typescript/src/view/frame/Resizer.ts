import {Component} from "../../core/Component"
import {Point} from "../../model/types/Point"

import "./Resizer.css"

const SHAPE_RESIZE_HANDLE_SIDE = 6

enum ResizerEvents {
    Drag = 'drag'
}

enum ResizerType {
    LeftDiagonal = 'left-diagonal',
    Vertical = 'vertical',
    RightDiagonal = 'right-diagonal',
    Horizontal = 'horizontal'
}

type State = Point

class Resizer extends Component<State> {
    private type: ResizerType

    get defaultState() {
        return {
            x: 0,
            y: 0,
        }
    }

    constructor(type: ResizerType, onDrag: (data: Point) => void) {
        super()

        this.type = type
        this.addEventListener(ResizerEvents.Drag, onDrag)
    }

    update(point: Point) {
        const newCoordinates = {
            x: point.x - SHAPE_RESIZE_HANDLE_SIDE / 2,
            y: point.y - SHAPE_RESIZE_HANDLE_SIDE / 2,
        }
        this.setState(newCoordinates)
    }

    onmousedown(e: MouseEvent) {
        e.preventDefault()

        const centerX = this.state.x + SHAPE_RESIZE_HANDLE_SIDE / 2
        const centerY = this.state.y + SHAPE_RESIZE_HANDLE_SIDE / 2

        const innerOffsetX = e.pageX - centerX
        const innerOffsetY = e.pageY - centerY

        document.onmousemove = (e) => 
            this.dispatchEvent(ResizerEvents.Drag, {
                x: e.pageX - innerOffsetX,
                y: e.pageY - innerOffsetY,
            })
        

        document.onmouseup = () => {
            document.onmousemove = null
        }
    }

    render() {
        return this.svg`
<svg class="resize-handler-wrapper" ondisconnected=${this}>
    <rect
        class="resize-handler ${this.type}"
        x=${this.state.x}
        y=${this.state.y}
        width=${SHAPE_RESIZE_HANDLE_SIDE}
        height=${SHAPE_RESIZE_HANDLE_SIDE}
        onmousedown=${this}
    ></rect>
</svg>`
    }
}

export {
    ResizerType,
    Resizer,
}