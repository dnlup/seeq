'use strict'

const Benchmark = require('benchmark')
const Seeq = require('./')

const suite = new Benchmark.Suite()
const size = 16
const s = new Seeq(size)
const list = [ 1, 2, 3 ]
const listIdx = 1

/* eslint-disable */
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
    const a = [] // this is here just to normalize the operations with the prevoius bench
    for (let i = 0; i < size; i++) {
      s.push(i)
    }
    const i = s.pop()
    for (const item of s) {
    }
  })
  .add('Array access', function arrayAccess () {
    const i = list[listIdx]
  })
  .add('Seeq access', function seeqAccess () {
    const i = s.current
  })
  .on('cycle', event => console.log(String(event.target)))
  .run()
