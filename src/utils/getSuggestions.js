// @flow
import type { SuggestionsT, SuggestionCollectionT } from '../types'

export default function getSuggestions(
  suggestions: SuggestionsT
): SuggestionCollectionT {
  let result = []

  for (var mentionType in suggestions) {
    if (!suggestions.hasOwnProperty(mentionType)) {
      return
    }

    result = result.concat({
      suggestions: suggestions[mentionType].results,
      descriptor: suggestions[mentionType],
    })
  }

  return result
}
