// @flow
import type { DisplayTransformFuncT } from '../types'

import markupToRegex from './markupToRegex'
import getPositionOfCapturingGroup from './getPositionOfCapturingGroup'

export default function getPlainText(
  value: string,
  markup: string,
  displayTransform: DisplayTransformFuncT
): string {
  const regex = markupToRegex(markup)
  const idPos = getPositionOfCapturingGroup(markup, 'id')
  const displayPos = getPositionOfCapturingGroup(markup, 'display')
  const typePos = getPositionOfCapturingGroup(markup, 'type')
  return value.replace(regex, function() {
    // first argument is the whole match, capturing groups are following
    const id = arguments[idPos + 1]
    let display = arguments[displayPos + 1]
    const type = arguments[typePos + 1]
    if (displayTransform) display = displayTransform(id, display, type)
    return display
  })
}
