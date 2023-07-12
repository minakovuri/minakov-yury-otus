import hljs from 'highlight.js'

/* eslint-disable no-restricted-globals */

self.onmessage = (event: MessageEvent<string>) => {
    const code = event.data

    const result = hljs.highlightAuto(code)

    self.postMessage(result.value)
}

export {}