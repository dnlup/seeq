'use strict'

const {
  kStart,
  kEnd,
  kSize,
  kQueue
} = require('./symbols')

class Seeq {
  constructor (size) {
    this[kStart] = 0
    this[kEnd] = 0
    this[kSize] = size
    this[kQueue] = []
  }

  get size () {
    return this[kSize]
  }

  get start () {
    return this[kStart]
  }

  get end () {
    return this[kEnd]
  }

  push (item) {
    if (this[kEnd] === this[kSize]) {
      this[kEnd] = 0
    }
    this[kQueue][this[kEnd]] = item
    return this[kEnd]++
  }

  pop () {
    if (this[kStart] === this[kSize]) {
      this[kStart] = 0
    } else if (this[kStart] === this[kEnd]) {
      return
    }
    const value = this[kQueue][this[kStart]]
    this[kQueue][this[kStart]] = null
    this[kStart]++
    return value
  }

  next () {
    const done = this[kStart] === this[kEnd]
    return done ? { done } : {
      value: this.pop(),
      done
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

module.exports = Seeq
