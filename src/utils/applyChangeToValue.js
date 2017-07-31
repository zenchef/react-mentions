// @flow
import type { DisplayTransformFuncT } from '../types'

import mapPlainTextIndex from './mapPlainTextIndex'
import spliceString from './spliceString'
import getPlainText from './getPlainText'

// Applies a change from the plain text textarea to the underlying marked up value
// guided by the textarea text selection ranges before and after the change
export default function applyChangeToValue(
  value: string,
  markup: string,
  plainTextValue: string,
  selectionStartBeforeChange?: number,
  selectionEndBeforeChange?: number,
  selectionEndAfterChange?: number,
  displayTransform: DisplayTransformFuncT
): string {
  var oldPlainTextValue = getPlainText(value, markup, displayTransform)

  var lengthDelta = oldPlainTextValue.length - plainTextValue.length
  if (selectionStartBeforeChange == null) {
    selectionStartBeforeChange = selectionEndAfterChange + lengthDelta
  }

  if (selectionEndBeforeChange == null) {
    selectionEndBeforeChange = selectionStartBeforeChange
  }

  // Fixes an issue with replacing combined characters for complex input. Eg like acented letters on OSX
  if (
    selectionStartBeforeChange === selectionEndBeforeChange &&
    selectionEndBeforeChange === selectionEndAfterChange &&
    oldPlainTextValue.length === plainTextValue.length
  ) {
    selectionStartBeforeChange = selectionStartBeforeChange - 1
  }

  // extract the insertion from the new plain text value
  var insert = plainTextValue.slice(
    selectionStartBeforeChange,
    selectionEndAfterChange
  )

  // handling for Backspace key with no range selection
  var spliceStart = Math.min(
    selectionStartBeforeChange,
    selectionEndAfterChange
  )

  var spliceEnd = selectionEndBeforeChange
  if (selectionStartBeforeChange === selectionEndAfterChange) {
    // handling for Delete key with no range selection
    spliceEnd = Math.max(
      selectionEndBeforeChange,
      selectionStartBeforeChange + lengthDelta
    )
  }

  var mappedSpliceStart = mapPlainTextIndex(
    value,
    markup,
    spliceStart,
    'START',
    displayTransform
  )
  var mappedSpliceEnd = mapPlainTextIndex(
    value,
    markup,
    spliceEnd,
    'END',
    displayTransform
  )

  var controlSpliceStart = mapPlainTextIndex(
    value,
    markup,
    spliceStart,
    'NULL',
    displayTransform
  )
  var controlSpliceEnd = mapPlainTextIndex(
    value,
    markup,
    spliceEnd,
    'NULL',
    displayTransform
  )
  var willRemoveMention =
    controlSpliceStart === null || controlSpliceEnd === null

  var newValue = spliceString(value, mappedSpliceStart, mappedSpliceEnd, insert)

  if (!willRemoveMention) {
    // test for auto-completion changes
    var controlPlainTextValue = getPlainText(newValue, markup, displayTransform)
    if (controlPlainTextValue !== plainTextValue) {
      // some auto-correction is going on

      // find start of diff
      spliceStart = 0
      while (plainTextValue[spliceStart] === controlPlainTextValue[spliceStart])
        spliceStart++

      // extract auto-corrected insertion
      insert = plainTextValue.slice(spliceStart, selectionEndAfterChange)

      // find index of the unchanged remainder
      spliceEnd = oldPlainTextValue.lastIndexOf(
        plainTextValue.substring(selectionEndAfterChange)
      )

      // re-map the corrected indices
      mappedSpliceStart = mapPlainTextIndex(
        value,
        markup,
        spliceStart,
        'START',
        displayTransform
      )
      mappedSpliceEnd = mapPlainTextIndex(
        value,
        markup,
        spliceEnd,
        'END',
        displayTransform
      )
      newValue = spliceString(value, mappedSpliceStart, mappedSpliceEnd, insert)
    }
  }

  return newValue
}
