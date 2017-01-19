var URI = require('./lil-uri')

export let setQuery = (uri, queryKey, queryValue) => {
  let uriObj = URI(uri)
  let queryObj = uriObj.query()

  if (!queryObj) {
    queryObj = {}
  }

  queryObj[queryKey] = queryValue
  return queryObj
}
