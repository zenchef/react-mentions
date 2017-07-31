// @flow

export default function extend<T>(target: T, ...sources: Array<$Shape<T>>): T {
  sources.forEach((source: $Shape<T>) => {
    let prop
    for (prop in source) {
      if (hasOwnProperty.call(source, prop)) {
        target[prop] = source[prop]
      }
    }
  })

  return target
}
