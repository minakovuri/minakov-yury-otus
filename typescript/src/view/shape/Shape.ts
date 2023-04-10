import {Component} from '../../core/Component'
import {Rect} from '../../model/types/Rect'

import './Shape.css'

enum ShapeEvents {
    Click = 'click',
    Dragged = 'dragged'
}

type State = {
    rect: Rect
}

abstract class Shape extends Component<State> {
    protected id: string

    constructor(id: string, rect: Rect) {
        super()

        this.id = id
        this.setState({
            rect,
        })
    }

    getId(): string {
        return this.id
    }

    getRect(): Rect {
        return this.state.rect
    }

    setRect(rect: Rect) {
        this.setState({
            rect: rect,
        })
    }

    onClick(handler: () => void) {
        this.addEventListener(ShapeEvents.Click, handler)
    }

    onDragged(handler: (details: {top: number,left: number}) => void) {
        this.addEventListener(ShapeEvents.Dragged, handler)
    }

    onmousedown(e: MouseEvent) {
        e.preventDefault()

        this.dispatchEvent(ShapeEvents.Click)

        const rect = this.getRect()

        const innerOffsetX = e.pageX - rect.left
        const innerOffsetY = e.pageY - rect.top

        document.onmousemove = (e) => {
            const newLeft = e.pageX - innerOffsetX
            const newTop = e.pageY - innerOffsetY

            this.dispatchEvent(ShapeEvents.Dragged, {
                top: newTop,
                left: newLeft,
            })
        }

        document.onmouseup = () => {
            document.onmousemove = null
        }
    }

    abstract renderImpl(): Element

    render() {
        return this.renderImpl()
    }
}

export {
    Shape
}