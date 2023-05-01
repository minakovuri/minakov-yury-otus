import {Component as HyperComponent} from "hyperhtml"
import {EventDispatcher} from "./EventDispatcher"

type EventCallback = (details?: any) => void

class Component<State = {}> extends HyperComponent<State> {
    private dispatcher: EventDispatcher = new EventDispatcher()

    addEventListener(event: string, callback: EventCallback): void {
        this.dispatcher.addListener(event, callback)
    }

    removeEventListener(event: string, callback: EventCallback): void {
        this.dispatcher.removeListener(event, callback)
    }

    dispatchEvent(event: string, details?: any): void {
        this.dispatcher.dispatch(event, details)
    }

    ondisconnected(): void {
        this.dispatcher.clearListeners()
    }
}

export {
    Component,
}