import React, { useCallback, useState } from 'react';
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css';
import { InputCodeField } from './components/InputCodeField';
import { HightightedCode } from './components/HighlightedCode';

import './App.css';

function App() {
  const [highlightedCodeHtml, setHighlightedCodeHtml] = useState('')

  const hightlightCode = useCallback((code: string) => {
    console.time('hightlight')
    const html = hljs.highlightAuto(code)
    console.timeEnd('hightlight')

    setHighlightedCodeHtml(html.value)
  }, [setHighlightedCodeHtml])

  return (
    <div className='app'>
      <header>
        <h1>Syntax highlighter</h1>
      </header>
      <main>
        <div className='container'>
          <InputCodeField onCodeChange={hightlightCode}></InputCodeField>
        </div>
        <div className='container'>
          <HightightedCode highlightedCodeHtml={highlightedCodeHtml}></HightightedCode>
        </div>
      </main>
    </div>
  );
}

export default App;
