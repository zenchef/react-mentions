// @flow
import React from 'react'

import type { Substyle } from 'substyle'

type PropsT = {
  display: string,
  query: string,
  style: Substyle,
}

export default function HighlightedDisplay({ display, query, style }: PropsT) {
  const i = display.toLowerCase().indexOf(query.toLowerCase())

  if (i === -1) {
    return (
      <span {...style}>
        {display}
      </span>
    )
  }

  return (
    <span {...style}>
      {display.substring(0, i)}

      <b {...style('highlight')}>
        {display.substring(i, i + query.length)}
      </b>
      {display.substring(i + query.length)}
    </span>
  )
}
