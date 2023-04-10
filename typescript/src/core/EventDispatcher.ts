type EventCallback = (details?: any) => void

class EventDispatcher {
    private events: { [key: string]: EventCallback[] } = {}

    addListener(event: string, callback: EventCallback): void {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }

    removeListener(event: string, callback: EventCallback): void {
        this.events[event].filter((listener: EventCallback) => listener === callback)
    }

    dispatch(event: string, details?: Object): void {
        if (this.events[event]) {
            this.events[event].forEach((listener: EventCallback) => listener(details))
        }
    }

    clearListeners(): void {
        this.events = {}
    }
}

export {
    EventDispatcher,
}