// @flow
import type { SuggestionsT } from '../types'

export default function countSuggestions(suggestions: SuggestionsT): number {
  let result = 0
  for (let prop in suggestions) {
    if (suggestions.hasOwnProperty(prop)) {
      result += suggestions[prop].results.length
    }
  }

  return result
}
