// @flow
import type { DisplayTransformFuncT } from '../types'

import iterateMentionsMarkup from './iterateMentionsMarkup'

// For a given indexInPlainText that lies inside a mention,
// returns a the index of of the first char of the mention in the plain text.
// If indexInPlainText does not lie inside a mention, returns indexInPlainText.
export default function findStartOfMentionInPlainText(
  value: string,
  markup: string,
  indexInPlainText: number,
  displayTransform: DisplayTransformFuncT
): ?number {
  let result = indexInPlainText
  let foundMention = false

  const markupIteratee = function(
    markup,
    index,
    mentionPlainTextIndex,
    id,
    display,
    type,
    lastMentionEndIndex
  ) {
    if (
      mentionPlainTextIndex <= indexInPlainText &&
      mentionPlainTextIndex + display.length > indexInPlainText
    ) {
      result = mentionPlainTextIndex
      foundMention = true
    }
  }

  iterateMentionsMarkup(
    value,
    markup,
    function() {},
    markupIteratee,
    displayTransform
  )

  if (foundMention) {
    return result
  }
}
