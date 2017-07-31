// @flow
type MapT = {
  [key: string]: string,
}

type EscaperFuncT = (value: string) => string

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '`': '&#x60;',
}

function createEscaper(map: MapT): EscaperFuncT {
  function escaper(match: string): string {
    return map[match]
  }

  const keys = []
  for (var key in map) {
    if (map.hasOwnProperty(key)) keys.push(key)
  }
  const source = '(?:' + keys.join('|') + ')'
  const testRegexp = RegExp(source)
  const replaceRegexp = RegExp(source, 'g')

  return function(text: ?string) {
    text = text == null ? '' : '' + text
    return testRegexp.test(text) ? text.replace(replaceRegexp, escaper) : text
  }
}

export default createEscaper(escapeMap)
