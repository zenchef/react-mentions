// @flow
import type { DisplayTransformFuncT } from '../types'

import findStartOfMentionInPlainText from './findStartOfMentionInPlainText'

// Returns whether the given plain text index lies inside a mention
export default function isInsideOfMention(
  value: string,
  markup: string,
  indexInPlainText: number,
  displayTransform: DisplayTransformFuncT
) {
  const mentionStart = findStartOfMentionInPlainText(
    value,
    markup,
    indexInPlainText,
    displayTransform
  )
  return mentionStart !== undefined && mentionStart !== indexInPlainText
}
