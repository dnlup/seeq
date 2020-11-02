'use strict'

const {
  kHead,
  kReadCursor,
  kWriteCursor,
  kOverflowed,
  kSize,
  kPop
} = require('./symbols')

class Node {
  constructor (id, value) {
    this.id = id
    this.value = value
    this.next = null
  }
}

function initCircularLinkedList (instance) {
  let last = instance[kHead]
  for (let i = 1; i < instance[kSize]; i++) {
    const node = new Node(i, null)
    last.next = node
    last = node
    if (i === instance[kSize] - 1) {
      node.next = instance[kHead]
    }
  }
}

class Seeq {
  constructor (size) {
    this[kHead] = new Node(0, null)
    this[kReadCursor] = this[kHead]
    this[kWriteCursor] = this[kHead]
    this[kOverflowed] = false
    this[kSize] = size
    initCircularLinkedList(this)
  }

  get size () {
    return this[kSize]
  }

  push (value) {
    const index = this[kWriteCursor].id
    this[kOverflowed] = this[kWriteCursor].next === this[kReadCursor]
    this[kWriteCursor].value = value
    this[kWriteCursor] = this[kWriteCursor].next
    return index
  }

  [kPop] () {
    this[kOverflowed] = false
    const value = this[kReadCursor].value
    this[kReadCursor] = this[kReadCursor].next
    return value
  }

  get done () {
    return this[kReadCursor] === this[kWriteCursor] && this[kOverflowed] === false
  }

  pop () {
    if (this.done) {
      return
    }
    return this[kPop]()
  }

  next () {
    const done = this.done
    return {
      value: done ? undefined : this[kPop](),
      done
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

module.exports = Seeq
