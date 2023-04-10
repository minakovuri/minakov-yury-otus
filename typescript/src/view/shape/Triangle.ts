import { Shape } from "./Shape"

class Triangle extends Shape {
    renderImpl() {
        const rect = this.state.rect

        const vertex1 = { x: rect.left, y: rect.top + rect.height }
        const vertex2 = { x: rect.left + rect.width / 2, y: rect.top }
        const vertex3 = { x: rect.left + rect.width, y: rect.top + rect.height }

        return this.svg`
<polygon
    class="shape"
    points="${vertex1.x} ${vertex1.y},${vertex2.x} ${vertex2.y},${vertex3.x} ${vertex3.y}"
    onmousedown=${this}
    ondisconnected=${this}
></polygon>`
    }
}

export {
    Triangle
}