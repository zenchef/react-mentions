// @flow
import type { MentionT } from '../types'

import iterateMentionsMarkup from './iterateMentionsMarkup'

export default function getMentions(
  value: string,
  markup: string
): Array<MentionT> {
  var mentions = []
  iterateMentionsMarkup(
    value,
    markup,
    function() {},
    function(match, index, plainTextIndex, id, display, type, start) {
      mentions.push({
        id: id,
        display: display,
        type: type,
        index: index,
        plainTextIndex: plainTextIndex,
      })
    }
  )
  return mentions
}
