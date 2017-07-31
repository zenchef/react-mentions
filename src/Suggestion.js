// @flow
import React from 'react'
import { defaultStyle } from 'substyle'
import { compose, withHandlers } from 'recompose'
import type { Substyle } from 'substyle'

import type { SuggestionT } from './types'

import { omitProps } from './higher-order'

import HighlightedDisplay from './HighlightedDisplay'
import Mention from './Mention'

type PropsT = {
  id: string,
  query: string,

  index: number,

  suggestion: SuggestionT,
  descriptor: React$Element<Mention>,

  focused?: boolean,
  style: Substyle,
}

function Suggestion({
  id,
  query,
  descriptor,
  suggestion,
  index,
  style,
  ...rest
}: PropsT) {
  const display = getDisplay(suggestion)
  const highlightedDisplay = (
    <HighlightedDisplay
      display={display}
      query={query}
      style={style('display')}
    />
  )

  return (
    <li {...rest} {...style}>
      {descriptor.props.renderSuggestion
        ? descriptor.props.renderSuggestion(
            suggestion,
            query,
            highlightedDisplay,
            index
          )
        : highlightedDisplay}
    </li>
  )
}

const getDisplay = suggestion => {
  if (suggestion instanceof String) {
    return suggestion
  }

  let { id, display } = suggestion

  if (!id || !display) {
    return id
  }

  return display
}

export default compose(
  withHandlers({
    onMouseEnter: ({ onMouseEnter, index }) => () =>
      onMouseEnter && onMouseEnter(index),
    onClick: ({ suggestion, descriptor, onSelect }) => () =>
      onSelect(suggestion, descriptor),
  }),
  defaultStyle(
    {
      cursor: 'pointer',
    },
    ({ focused }) => ({ '&focused': focused })
  ),
  omitProps(['focused'])
)(Suggestion)
