'use strict'

const Benchmark = require('benchmark')
const Seeq = require('./')
const SeeqLinked = require('./linked')

const suite = new Benchmark.Suite()
const size = 16

const s = new Seeq(size)
const sl = new SeeqLinked(size)

suite
  .add('Array.prototype.splice + Array.prototype[Symbol.iterator]', function array () {
    const a = []
    for (let i = 0; i < size; i++) {
      a.push(i)
    }
    const b = a.splice(1)
    for (const item of b) {
    }
  })
  .add('Seeq.prototype[Symbol.iterator]', function sique () {
    for (let i = 0; i < size; i++) {
      s.push(i)
    }
    const i = s.pop()
    for (const item of s) {
    }
  })
  .add('SeeqLinked.prototype[Symbol.iterator]', function seeqLinked () {
    for (let i = 0; i < size; i++) {
      sl.push(i)
    }
    const i = sl.pop()
    for (const item of sl) {
    }
  })
  .on('cycle', event => console.log(String(event.target)))
  .run()
