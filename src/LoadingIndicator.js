// @flow
import React from 'react'
import substyle from 'substyle'
import type { Substyle } from 'substyle'

type PropsT = {
  style: Substyle,
}

function LoadingIndicator({ style }: PropsT) {
  const spinnerStyle = style('spinner')
  return (
    <div {...style}>
      <div {...spinnerStyle}>
        <div {...spinnerStyle(['element', 'element1'])} />
        <div {...spinnerStyle(['element', 'element2'])} />
        <div {...spinnerStyle(['element', 'element3'])} />
        <div {...spinnerStyle(['element', 'element4'])} />
        <div {...spinnerStyle(['element', 'element5'])} />
      </div>
    </div>
  )
}

export default substyle(LoadingIndicator)
