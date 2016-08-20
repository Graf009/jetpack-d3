export const get = (...iteratee) => {
  // convert all string arguments into field accessors
  const functions = iteratee.map(
    (funct) => (typeof funct !== 'function' ? (d) => d[funct] : funct)
  )

  // return composition of functions
  return (d) => {
    functions.forEach(
      (funct) => { d = funct.call(this, d) }
    )
    return d
  }
}

export const defValue = (value) => (d) => d || value

export const concat = (key1, key2) => (d) => {
  const value1 = get(key1)(d)
  const value2 = get(key2)(d) || ''

  return value1 ? value1 + value2 : value1
}
