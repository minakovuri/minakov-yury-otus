import { Shape } from "./Shape";

class Ellipse extends Shape {
    renderImpl() {
        const rect = this.state.rect

        const horizontalRadius = rect.width / 2
        const verticalRadius = rect.height / 2

        const center = {
            x: rect.left + horizontalRadius,
            y: rect.top + verticalRadius,
        }

        return this.svg`
<ellipse
    class="shape"
    rx=${horizontalRadius}
    ry=${verticalRadius}
    cx=${center.x}
    cy=${center.y}
    onmousedown=${this}
    ondisconnected=${this}
></ellipse>`
    }
}

export {
    Ellipse
}