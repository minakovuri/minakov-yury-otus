import React, {useEffect, useRef} from "react"
import 'highlight.js/styles/github.css';

import './HighlightedCode.css'

type Props = {
    highlightedCodeHtml: string,
}

export function HightightedCode(props: Props) {
    const {highlightedCodeHtml} = props

    const ref = useRef<HTMLElement>(null)

    useEffect(() => {
        if (!ref.current) {
            return
        }

        ref.current.innerHTML = highlightedCodeHtml
    }, [highlightedCodeHtml])

    return (
<pre><code ref={ref}></code></pre>
    )
}