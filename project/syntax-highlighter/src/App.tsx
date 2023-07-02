import React, { useCallback, useMemo, useState } from 'react';
import { InputCodeField } from './components/InputCodeField';
import { HightightedCode } from './components/HighlightedCode';
import { Theme } from './types/Theme';
import { Toolbar } from './components/Toolbar';
import { highlightCodeSync } from './highlighter/sync/highlightCodeSync';
import { initHighlightCodeAsync } from './highlighter/async/initHighlightCodeAsync';

import './App.css';
import 'highlight.js/styles/a11y-dark.css';

function App() {
  const [theme, setTheme] = useState<Theme>(Theme.A_11_Y_DARK)
  const [asyncMode, setAsyncMode] = useState(false)

  const [highlightedCodeHtml, setHighlightedCodeHtml] = useState('')

  const hightlightCodeSync = useCallback((code: string) => {
    const html = highlightCodeSync(code)
    setHighlightedCodeHtml(html.value)
  }, [setHighlightedCodeHtml])

  const hightlightCodeAsync = useMemo(
    () => initHighlightCodeAsync(setHighlightedCodeHtml),
    [setHighlightedCodeHtml]
  )

  return (
    <div className='app'>
      <header>
        <h1>Syntax highlighter</h1>
        <Toolbar theme={theme} asyncMode={asyncMode} onChangeTheme={setTheme} enableAsyncMode={setAsyncMode}></Toolbar>
      </header>
      <main>
        <div className='container'>
          <InputCodeField onCodeChange={asyncMode ? hightlightCodeAsync : hightlightCodeSync}></InputCodeField>
        </div>
        <div className='container'>
          <HightightedCode highlightedCodeHtml={highlightedCodeHtml}></HightightedCode>
        </div>
      </main>
    </div>
  );
}

export default App;
