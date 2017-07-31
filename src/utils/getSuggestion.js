// @flow
import type { SuggestionsT, SuggestionT } from '../types'

import getSuggestions from './getSuggestions'

export default function getSuggestion(
  suggestions: SuggestionsT,
  index: number
): SuggestionT {
  return getSuggestions(suggestions).reduce(
    (result, { suggestions, descriptor }) => [
      ...result,

      ...suggestions.map(suggestion => ({
        suggestion,
        descriptor,
      })),
    ],
    []
  )[index]
}
