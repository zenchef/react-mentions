export type SuggestionT =
  | string
  | {
      id: string,
      display?: string,
    }

export type SuggestionsT = {
  [mentionType: string]: SuggestionT,
}
