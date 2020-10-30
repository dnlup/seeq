'use strict'

const Benchmark = require('benchmark')
const Seeq = require('./')

const suite = new Benchmark.Suite()
const size = 16

suite
  .add('Array.prototype.splice + Array.prototype[Symbol.iterator]', function array () {
    const a = Array(size)
    for (let i = 0; i < size; i++) {
      a.push(i)
    }
    const b = a.splice(1)
    for (const item of b) {
    }
  })
  .add('Seeq.prototype[Symbol.iterator]', function seeq () {
    const s = new Seeq(size)
    for (let i = 0; i < size; i++) {
      s.push(i)
    }
    const i = s.pop()
    for (const item of s) {
    }
  })
  .on('cycle', event => console.log(String(event.target)))
  .run()
