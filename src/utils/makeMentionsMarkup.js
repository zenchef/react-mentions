// @flow
import PLACEHOLDERS from './placeholders'

export default function makeMentionsMarkup(
  markup: string,
  id: string,
  display: string,
  type: string
): string {
  var result = markup.replace(PLACEHOLDERS.id, id)
  result = result.replace(PLACEHOLDERS.display, display)
  result = result.replace(PLACEHOLDERS.type, type)
  return result
}
