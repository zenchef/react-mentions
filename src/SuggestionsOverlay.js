// @flow
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { defaultStyle } from 'substyle'
import type { Substyle } from 'substyle'

import * as utils from './utils'

import type { SuggestionsT, SuggestionT } from './types'

import Mention from './Mention'
import Suggestion from './Suggestion'
import LoadingIndicator from './LoadingIndicator'

type SelectFuncT = (
  suggestion: SuggestionT,
  descriptor: React$Element<Mention>
) => void

type DefaultPropsT = {
  suggestions: SuggestionsT,
  onSelect: SelectFuncT,
}

type PropsT = {
  suggestions: SuggestionsT,

  style: Substyle,

  focusIndex?: number,
  scrollFocusedIntoView?: boolean,
  isLoading?: boolean,

  onSelect?: SelectFuncT,
  onMouseEnter?: (index: number) => void,
  onMouseDown?: (ev: SyntheticMouseEvent) => void,
}

class SuggestionsOverlay extends PureComponent<DefaultPropsT, PropsT, void> {
  static propTypes = {
    suggestions: PropTypes.object.isRequired,
    focusIndex: PropTypes.number,
    scrollFocusedIntoView: PropTypes.bool,
    isLoading: PropTypes.bool,
    onSelect: PropTypes.func,
  }

  static defaultProps = {
    suggestions: {},
    onSelect: () => {},
  }

  componentDidUpdate() {
    const { suggestions } = this.refs
    if (
      !suggestions ||
      suggestions.offsetHeight >= suggestions.scrollHeight ||
      !this.props.scrollFocusedIntoView
    ) {
      return
    }

    const scrollTop = suggestions.scrollTop

    let { top, bottom } = suggestions.children[
      this.props.focusIndex
    ].getBoundingClientRect()

    const { top: topContainer } = suggestions.getBoundingClientRect()

    top = top - topContainer + scrollTop
    bottom = bottom - topContainer + scrollTop

    if (top < scrollTop) {
      suggestions.scrollTop = top
    } else if (bottom > suggestions.offsetHeight) {
      suggestions.scrollTop = bottom - suggestions.offsetHeight
    }
  }

  render() {
    const {
      suggestions,
      isLoading,
      style,
      focusIndex,
      onMouseDown,
      onMouseEnter,
      onSelect,
    } = this.props

    // do not show suggestions until there is some data
    if (utils.countSuggestions(suggestions) === 0 && !isLoading) {
      return null
    }

    return (
      <div {...style} onMouseDown={onMouseDown}>
        <ul ref="suggestions" {...style('list')}>
          {utils
            .getSuggestions(suggestions)
            .reduce((result, { suggestions, descriptor }) => {
              const { mentionDescriptor, query } = descriptor

              return [
                ...result,

                ...suggestions.map((suggestion, index) => {
                  const id = getID(suggestion)
                  const isFocused = index === focusIndex

                  return (
                    <Suggestion
                      style={style('item')}
                      key={id}
                      id={id}
                      ref={isFocused ? 'focused' : null}
                      query={query}
                      index={index}
                      descriptor={mentionDescriptor}
                      suggestion={suggestion}
                      focused={isFocused}
                      onSelect={onSelect}
                      onMouseEnter={onMouseEnter}
                    />
                  )
                }),
              ]
            }, [])}
        </ul>

        {isLoading && <LoadingIndicator {...style('loadingIndicator')} />}
      </div>
    )
  }
}

const getID = (suggestion: SuggestionT) => {
  if (suggestion instanceof String) {
    return suggestion
  }

  return suggestion.id
}

const styled = defaultStyle(({ position }) => ({
  position: 'absolute',
  zIndex: 1,
  backgroundColor: 'white',
  marginTop: 14,
  minWidth: 100,
  ...position,

  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
}))

export default styled(SuggestionsOverlay)
