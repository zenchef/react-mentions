import Mention from './Mention'

export type SuggestionT =
  | string
  | {
      id: string,
      display?: string,
    }

export type SuggestionsT = {
  [mentionType: string]: {
    results: Array<SuggestionT>,
  },
}

export type MentionT = {
  id: string,
  display: string,
  type: string,
  index: number,
  plainTextIndex: number,
}

export type DisplayTransformFuncT = (
  id: string,
  display: string,
  type: string
) => string

export type MarkupIterateeFuncT = (
  math: string,
  index: number,
  plainTextIndex: number,
  id: string,
  display: string,
  type: string,
  start: number
) => void

export type TextIterateeFuncT = (
  text: string,
  start: number,
  end: number
) => void

export type MarkupCorrectionT = 'START' | 'END' | 'NULL'

export type SuggestionCollectionT = Array<{
  suggestion: SuggestionT,
  descriptor: Mention,
}>
