// @flow
import type {
  DisplayTransformFuncT,
  MarkupIterateeFuncT,
  TextIterateeFuncT,
} from '../types'

import markupToRegex from './markupToRegex'
import getPositionOfCapturingGroup from './getPositionOfCapturingGroup'

// Finds all occurences of the markup in the value and iterates the plain text sub strings
// in between those markups using `textIteratee` and the markup occurrences using the
// `markupIteratee`.
export default function iterateMentionsMarkup(
  value: string,
  markup: string,
  textIteratee: TextIterateeFuncT,
  markupIteratee: MarkupIterateeFuncT,
  displayTransform: DisplayTransformFuncT
) {
  var regex = markupToRegex(markup)
  var displayPos = getPositionOfCapturingGroup(markup, 'display')
  var idPos = getPositionOfCapturingGroup(markup, 'id')
  var typePos = getPositionOfCapturingGroup(markup, 'type')

  var match
  var start = 0
  var currentPlainTextIndex = 0

  // detect all mention markup occurences in the value and iterate the matches
  while ((match = regex.exec(value)) !== null) {
    var id = match[idPos + 1]
    var display = match[displayPos + 1]
    var type = typePos !== null ? match[typePos + 1] : null

    if (displayTransform) display = displayTransform(id, display, type)

    var substr = value.substring(start, match.index)
    textIteratee(substr, start, currentPlainTextIndex)
    currentPlainTextIndex += substr.length

    markupIteratee(
      match[0],
      match.index,
      currentPlainTextIndex,
      id,
      display,
      type,
      start
    )
    currentPlainTextIndex += display.length

    start = regex.lastIndex
  }

  if (start < value.length) {
    textIteratee(value.substring(start), start, currentPlainTextIndex)
  }
}
