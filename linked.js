'use strict'

const symbols = {
  kHead: Symbol('kHead'),
  kReadCursor: Symbol('kReadCursor'),
  kWriteCursor: Symbol('kWriteCursor'),
  kOverflowed: Symbol('kOverflowed'),
  kSize: Symbol('kSize'),
  kQueue: Symbol('kQueue'),
  kPop: Symbol('kPop'),
}

const {
  kHead,
  kReadCursor,
  kWriteCursor,
  kOverflowed,
  kSize,
  kQueue,
  kPop,
  kCursor
} = symbols

class Node {
  constructor (id, value) {
    this.id = id
    this.value = value
    this.next = null
  }
}

class Seeq {
  constructor (size) {
    this[kHead] = new Node(0, null)
    this[kReadCursor] = this[kHead]
    this[kWriteCursor] = this[kHead]
    this[kOverflowed] = false
    this[kSize] = size

    let last = this[kHead]
    // Initialize the circular linked list used
    // as a queue
    for (let i = 1; i < size; i++) {
      const node = new Node(i, null)
      last.next = node
      last = node
      if (i === size - 1) {
        node.next = this[kHead] 
      }
    }
  }

  get size () {
    return this[kSize]
  }

  push (value) {
    this[kOverflowed] = this[kWriteCursor].next === this[kReadCursor]
    this[kWriteCursor].value = value
    this[kWriteCursor] = this[kWriteCursor].next
  }

  [kPop] () {
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
    this[kOverflowed] = false
    return this[kPop]()
  }

  next () {
    this[kOverflowed] = false
    const done = this.done
    return {
      value: done? undefined : this[kPop](),
      done
    }
  }

  [Symbol.iterator] () {
    return this
  }
}

module.exports = Seeq
