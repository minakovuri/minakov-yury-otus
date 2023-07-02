import React from "react"
import { Theme } from "../types/Theme"

import './Toolbar.css'

type Props = {
    theme: Theme,
    asyncMode: boolean,
    onChangeTheme: (value: Theme) => void,
    enableAsyncMode: (value: boolean,) => void,
}

export function Toolbar(props: Props) {
    const {theme, asyncMode, onChangeTheme, enableAsyncMode} = props

    return (
<div className="toolbar">
    <select value={theme} onChange={e => onChangeTheme(e.target.value as Theme)}>
        <option value={Theme.A_11_Y_DARK}>{Theme.A_11_Y_DARK}</option>
        <option value={Theme.A_11_Y_LIGHT}>{Theme.A_11_Y_LIGHT}</option>
    </select>
    <div>
        <input id="async-mode" type="checkbox" checked={asyncMode} onChange={() => enableAsyncMode(!asyncMode)}/>
        <label htmlFor="async-mode">Enable async mode</label>
    </div>
</div>
    )
}