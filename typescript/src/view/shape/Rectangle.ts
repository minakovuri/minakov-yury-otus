import { Shape } from "./Shape"

class Rectangle extends Shape {
     renderImpl() {
        const rect = this.state.rect

        return this.svg`
<rect
    class="shape"
    x=${rect.left}
    y=${rect.top}
    width=${rect.width}
    height=${rect.height}
    onmousedown=${this}
    ondisconnected=${this}
></rect>`
    }
}

export {
    Rectangle,
}