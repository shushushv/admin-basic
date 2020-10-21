const { pathToRegexp } = require("path-to-regexp");

export function isDev () {
  return process.env.NODE_ENV === 'development';
}

export function queryLayout (layouts: any, pathname: string) {
  let result = 'public'

  const isMatch = (regepx: RegExp) => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathToRegexp(regepx).exec(pathname)
  }

  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
      break
    }
  }

  return result
}