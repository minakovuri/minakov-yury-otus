export function initHighlightCodeAsync(
    handleResult: (result: string) => void
) {
    const worker = new Worker(new URL('./worker.ts', import.meta.url))

    worker.onmessage = event => { handleResult(event.data) }

    return (code: string) => worker.postMessage(code)
}