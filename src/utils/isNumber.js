// @flow
export default function isNumber(item: any): boolean {
  return Object.prototype.toString.call(item) === '[object Number]'
}
