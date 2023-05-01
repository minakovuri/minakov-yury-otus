import {Rect} from "../../model/types/Rect"
import {Component} from "../../core/Component"
import {Resizer, ResizerType} from "./Resizer"

import "./Frame.css"

enum FrameEvents {
    Resize = 'resize',
}

const MIN_WIDTH = 1
const MIN_HEIGHT = 1

type State = {
    shapeId: string,
    rect: Rect,
    enabled: boolean
}

class Frame extends Component<State> {
    private topLeftResizer: Resizer
    private topMiddleResizer: Resizer
    private topRightResizer: Resizer
    private leftMiddleResizer: Resizer
    private rightMiddleResizer: Resizer
    private bottomLeftResizer: Resizer
    private bottomMiddleResizer: Resizer
    private bottomRightResizer: Resizer
    
    constructor(shapeId: string, rect: Rect) {
        super()

        this.topLeftResizer = new Resizer(ResizerType.LeftDiagonal, ({ x, y }) => {
            const currentRect = this.state.rect

            const widthDiff = currentRect.left - x
            const heightDiff = currentRect.top - y

            const left = x
            const top = y
            const width = currentRect.width + widthDiff
            const height = currentRect.height + heightDiff

            if (width >= MIN_WIDTH && height >= MIN_HEIGHT) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.topMiddleResizer = new Resizer(ResizerType.Vertical, ({ x, y }) => {
            const currentRect = this.state.rect
            const heightDiff = currentRect.top - y

            const left = currentRect.left
            const top = y
            const width = currentRect.width
            const height = currentRect.height + heightDiff

            if (height >= MIN_HEIGHT) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.topRightResizer = new Resizer(ResizerType.RightDiagonal, ({ x, y }) => {
            const currentRect = this.state.rect

            const widthDiff = x - (currentRect.left + currentRect.width)
            const heightDiff = currentRect.top - y

            const left = currentRect.left
            const top = y
            const width = currentRect.width + widthDiff
            const height = currentRect.height + heightDiff

            if (width >= MIN_WIDTH && height >= MIN_HEIGHT) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.leftMiddleResizer = new Resizer(ResizerType.Horizontal, ({ x, y }) => {
            const currentRect = this.state.rect

            const widthDiff = currentRect.left - x

            const left = x
            const top = currentRect.top
            const width = currentRect.width + widthDiff
            const height = currentRect.height

            if (width >= MIN_WIDTH) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.rightMiddleResizer = new Resizer(ResizerType.Horizontal, ({ x, y }) => {
            const currentRect = this.state.rect

            const widthDiff = x - (currentRect.left + currentRect.width)

            const left = currentRect.left
            const top = currentRect.top
            const width = currentRect.width + widthDiff
            const height = currentRect.height

            if (width >= MIN_WIDTH) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.bottomLeftResizer = new Resizer(ResizerType.RightDiagonal, ({ x, y }) => {
            const currentRect = this.state.rect

            const widthDiff = currentRect.left - x
            const heightDiff = y - (currentRect.top + currentRect.height)

            const left = x
            const top = currentRect.top
            const width = currentRect.width + widthDiff
            const height = currentRect.height + heightDiff

            if (width >= MIN_WIDTH && height >= MIN_HEIGHT) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.bottomMiddleResizer = new Resizer(ResizerType.Vertical, ({ x, y }) => {
            const currentRect = this.state.rect

            const heightDiff = y - (currentRect.top + currentRect.height)

            const left = currentRect.left
            const top = currentRect.top
            const width = currentRect.width
            const height = currentRect.height + heightDiff

            if (height >= MIN_HEIGHT) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.bottomRightResizer = new Resizer(ResizerType.LeftDiagonal, ({ x, y }) => {
            const currentRect = this.state.rect

            const widthDiff = x - (currentRect.left + currentRect.width)
            const heightDiff = y - (currentRect.top + currentRect.height)

            const left = currentRect.left
            const top = currentRect.top
            const width = currentRect.width + widthDiff
            const height = currentRect.height + heightDiff

            if (width >= MIN_WIDTH && height >= MIN_HEIGHT) {
                this.dispatchEvent(FrameEvents.Resize, {left, top, width, height})
            }
        })

        this.setState({
            shapeId,
            rect,
            enabled: false,
        })
    }

    getShapeId(): string {
        return this.state.shapeId
    }

    setRect(rect: Rect) {
        this.setState({
            rect,
        })
    }

    setEnabled(enabled: boolean) {
        this.setState({
            enabled,
        })
    }

    getEnabled(): boolean {
        return this.state.enabled
    }

    onResize(handler: (details: Rect) => void) {
        this.addEventListener(FrameEvents.Resize, handler)
    }

    private getStyles() {
        return {
            display: this.state.enabled ? 'block' : 'none'
        }
    }

    render() {
        const rect = this.state.rect

        const topLeft = { x: rect.left, y: rect.top }
        const topMiddle = { x: rect.left + rect.width / 2, y: rect.top }
        const topRight = { x: rect.left + rect.width, y: rect.top }

        const leftMiddle = { x: rect.left, y: rect.top + rect.height / 2 }
        const rightMiddle = { x: rect.left + rect.width, y: rect.top + rect.height / 2 }

        const bottomLeft = { x: rect.left, y: rect.top + rect.height }
        const bottomMiddle = { x: rect.left + rect.width / 2, y: rect.top + rect.height }
        const bottomRight = { x: rect.left + rect.width, y: rect.top + rect.height }

        this.topLeftResizer.update(topLeft)
        this.topMiddleResizer.update(topMiddle)
        this.topRightResizer.update(topRight)

        this.leftMiddleResizer.update(leftMiddle)
        this.rightMiddleResizer.update(rightMiddle)

        this.bottomLeftResizer.update(bottomLeft)
        this.bottomMiddleResizer.update(bottomMiddle)
        this.bottomRightResizer.update(bottomRight)

        return this.html`
<svg
    class="frame"
    style=${this.getStyles()}
    ondisconnected=${this}
>
    <line x1="${topLeft.x}" y1="${topLeft.y}" x2="${bottomLeft.x}" y2="${bottomLeft.y}" class="rect-border"></line>
    <line x1="${topLeft.x}" y1="${topLeft.y}" x2="${topRight.x}" y2="${topRight.y}" class="rect-border"></line>
    <line x1="${topRight.x}" y1="${topRight.y}" x2="${bottomRight.x}" y2="${bottomRight.y}" class="rect-border"></line>
    <line x1="${bottomRight.x}" y1="${bottomRight.y}" x2="${bottomLeft.x}" y2="${bottomLeft.y}" class="rect-border"></line>
    ${ this.topLeftResizer }
    ${ this.topMiddleResizer }
    ${ this.topRightResizer }
    ${ this.rightMiddleResizer }
    ${ this.bottomRightResizer }
    ${ this.bottomMiddleResizer }
    ${ this.bottomLeftResizer }
    ${ this.leftMiddleResizer }
</svg>`
    }
}

export {
    Frame,
}