// @flow
import escapeRegex from './escapeRegex'
import PLACEHOLDERS from './placeholders'

export default function markupToRegex(
  markup: string,
  matchAtEnd?: boolean
): RegExp {
  var markupPattern = escapeRegex(markup)
  markupPattern = markupPattern.replace(PLACEHOLDERS.display, '(.+?)')
  markupPattern = markupPattern.replace(PLACEHOLDERS.id, '(.+?)')
  markupPattern = markupPattern.replace(PLACEHOLDERS.type, '(.+?)')
  if (matchAtEnd) {
    // append a $ to match at the end of the string
    markupPattern = markupPattern + '$'
  }
  return new RegExp(markupPattern, 'g')
}
