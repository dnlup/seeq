'use strict'

// const Seeq = require('./')
const Seeq = require('./linked')

const size = 3
const s = new Seeq(size)

let iteration = 1

for (let i = 0; i < size; i++) {
  s.push(`${iteration}-${i}`)
}

console.log(s.pop())

for (const item of s) {
  console.log(item)
}

iteration++

for (let i = 0; i < size; i++) {
  s.push(`${iteration}-${i}`)
}

console.log(s.pop())

for (const item of s) {
  console.log(item)
}
