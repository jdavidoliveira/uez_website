export function insertTextByStringIndex(string: string, index: number, textToInsert: string) {
  return string.slice(0, index) + textToInsert + string.slice(index)
}
