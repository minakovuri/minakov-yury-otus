import hljs, { AutoHighlightResult} from 'highlight.js'

export function highlightCodeSync(code: string): AutoHighlightResult {
    return hljs.highlightAuto(code)
}