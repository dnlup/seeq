'use strict'

const { test } = require('tap')
const Seeq = require('./')
const symbols = require('./symbols')

test('constructor', t => {
  const size = 3
  const s = new Seeq(size)
  t.is(s.size, size)
  t.is(s[symbols.kHead].id, 0)
  let node = s[symbols.kHead].next
  for (let i = 1; i < size; i++) {
    t.is(node.id, i)
    node = node.next
  }
  t.end()
})

test('push - pop', t => {
  const size = 3
  const s = new Seeq(size)
  s.push(1)
  t.is(1, s.pop())
  t.is(undefined, s.pop())
  t.true(s.done)
  t.end()
})

test('overflow', t => {
  const size = 3
  const s = new Seeq(size)
  for (let i = 0; i < size; i++) {
    s.push(i)
  }
  t.true(s[symbols.kOverflowed])
  t.false(s.done)
  t.is(s.pop(), s[symbols.kHead].value)
  t.false(s[symbols.kOverflowed])
  t.false(s.done)
  t.end()
})

test('iterator', t => {
  const size = 10
  const s = new Seeq(size)

  for (let i = 0; i < size; i++) {
    s.push(i)
  }

  let count = 0
  for (const item of s) {
    t.is(item, count++)
  }

  for (let i = 1; i < size - 2; i++) {
    s.push(count + i)
  }

  const start = size + 1
  count = 0
  for (const item of s) {
    t.is(item, start + count++)
  }
  t.end()
})
