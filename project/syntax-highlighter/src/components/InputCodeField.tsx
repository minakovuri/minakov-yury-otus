import React from "react"

import './InputCodeField.css'

type Props = {
    onCodeChange: (code: string) => void
}

export function InputCodeField(props: Props) {
    const {onCodeChange} = props

    return (
<textarea className='input-code-field' onChange={e => onCodeChange(e.target.value)}></textarea>
    )
}