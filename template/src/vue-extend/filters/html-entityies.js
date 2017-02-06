import { XmlEntities, AllHtmlEntities } from 'html-entities'
var entities = new XmlEntities()
var allEntities = new AllHtmlEntities()
// https://www.npmjs.com/package/html-entities

export let entityEncode = (string) => {
  return entities.encode(string)
}
export let entityUnEncode = (string) => {
  return entities.decode(string)
}
export let allEntityEncode = (string) => {
  return allEntities.encode(string)
}
export let allEntityUnEncode = (string) => {
  return allEntities.decode(string)
}
export let safeAllEntityEncode = (string) => {
  return allEntities.encode(allEntities.decode(string))
}
