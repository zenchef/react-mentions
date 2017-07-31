// @flow
export default function spliceString(
  text: string,
  start: number,
  end: number,
  insert: string
): string {
  return text.substring(0, start) + insert + text.substring(end)
}
