// @flow
export default function escapeRegex(text: string): string {
  return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}
