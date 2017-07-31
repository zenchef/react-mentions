// @flow
import PLACEHOLDERS from './placeholders'

/**
 * parameterName: "id", "display", or "type"
 */
export default function getPositionOfCapturingGroup(
  markup: string,
  parameterName: string
): ?number {
  if (
    parameterName !== 'id' &&
    parameterName !== 'display' &&
    parameterName !== 'type'
  ) {
    throw new Error("parameterName must be 'id', 'display', or 'type'")
  }

  // calculate positions of placeholders in the markup
  var indexDisplay = markup.indexOf(PLACEHOLDERS.display)
  var indexId = markup.indexOf(PLACEHOLDERS.id)
  var indexType = markup.indexOf(PLACEHOLDERS.type)

  // set indices to null if not found
  if (indexDisplay < 0) indexDisplay = null
  if (indexId < 0) indexId = null
  if (indexType < 0) indexType = null

  if (indexDisplay === null && indexId === null) {
    // markup contains none of the mandatory placeholders
    throw new Error(
      'The markup `' +
        markup +
        '` must contain at least one of the placeholders `__id__` or `__display__`'
    )
  }

  if (indexType === null && parameterName === 'type') {
    // markup does not contain optional __type__ placeholder
    return null
  }

  // sort indices in ascending order (null values will always be at the end)
  var sortedIndices = [indexDisplay, indexId, indexType].sort(numericComparator)

  // If only one the placeholders __id__ and __display__ is present,
  // use the captured string for both parameters, id and display
  if (indexDisplay === null) indexDisplay = indexId
  if (indexId === null) indexId = indexDisplay

  if (parameterName === 'id') return sortedIndices.indexOf(indexId)
  if (parameterName === 'display') return sortedIndices.indexOf(indexDisplay)
  if (parameterName === 'type')
    return indexType === null ? null : sortedIndices.indexOf(indexType)
}

function numericComparator(a: number, b: number): number {
  a = a === null ? Number.MAX_VALUE : a
  b = b === null ? Number.MAX_VALUE : b
  return a - b
}
