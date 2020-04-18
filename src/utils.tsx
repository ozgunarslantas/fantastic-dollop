import { concat } from "ramda"

// https://javascript.info/task/shuffle
function shuffle(array: any[]) {
  const tmp: any[] = concat([], array)
  for (let i = tmp.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let t = tmp[i]
    tmp[i] = tmp[j]
    tmp[j] = t
  }
  return tmp
}

export { shuffle }
