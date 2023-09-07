import test from 'node:test'
import assert from 'node:assert'

const _items = Symbol('stackItems')
const _count = Symbol('stackCount')
const _lowestCount = Symbol('stackLowestCount')

class Deque {
    constructor(){
        this[_items] = {}
        this[_count] = 0
        this[_lowestCount] = 0        
    }

    get items(){
        return this[_items]
    }

    get count(){
        return this[_count]
    }

    get lowestCount(){
        return this[_lowestCount]
    }

    addFront(value){
        if(this.isEmpty()) {
            this.addBack(value)
            return
        }
        if(this.lowestCount > 0) {
            this.items[this.lowestCount - 1] = value
            this[_lowestCount]--
            return
        }
        const itens = this.items
        for(let index = this.count; index > 0; index--){
            this.items[index] = this.items[index - 1]
        }
        this[_count]++
        this[_lowestCount] = 0
        this.items[this.lowestCount] = value
    }

    isEmpty(){
        const size = Object.values(this.items).length
        return size === 0
    }

    peekFront(){
        return this.items[this.lowestCount]
    }

    addBack(value){
        this.items[this.count] = value
        this[_count]++
    }

    peekBack(){
        if(this.isEmpty()) return undefined
        return this.items[this.count - 1]
    }

    removeFront(){
        delete this.items[this.lowestCount]
        this[_lowestCount]++
    }

    removeBack(){
        if(!this.isEmpty()) delete this.items[this.count - 1]
        this[_count]--
    }

    size(){
        return this.count - this.lowestCount
    }

    clear(){
        this[_items] = {}
        this[_count] = 0
        this[_lowestCount] = 0
    }
}

test('Deve adicionar na frente da fila com a fila vazia', () => {
    const deque = new Deque()
    deque.addFront(1)
    const result = deque.peekFront()
    assert.strictEqual(result, 1)
})

test('Deve adicionar no fim da fila', () => {
    const deque = new Deque()
    deque.addBack(1)
    deque.addBack(2)
    const result = deque.peekBack()
    assert.strictEqual(result, 2)
})

test('Deve adicionar na frente da fila quando já populada', () => {
    const deque = new Deque()
    deque.addFront(3)
    deque.addFront(2)
    deque.addFront(1)
    const result = deque.peekFront()
    assert.strictEqual(result, 1)
})

test('Deve remover da frente', () => {
    const deque = new Deque()
    deque.addFront(3)
    deque.addFront(2)
    deque.removeFront()
    const result = deque.peekFront()
    assert.strictEqual(result, 3)
})

test('Deve adicionar na frente da fila quando houve remoção prévia', () => {
    const deque = new Deque()
    deque.addFront(3)
    deque.addFront(2)
    deque.addFront(4)
    deque.removeFront()
    deque.addFront(1)
    const result = deque.peekFront()
    assert.strictEqual(result, 1)
    assert.strictEqual(deque.size(), 3)
})

test('Deve remover de trás', () => {
    const deque = new Deque()
    deque.addFront(3)
    deque.addFront(2)
    deque.addFront(1)
    deque.removeBack()
    const result = deque.peekBack()
    assert.strictEqual(result, 2)
    assert.strictEqual(deque.size(), 2)
})

test('Deve limpar a lista', () => {
    const deque = new Deque()
    deque.addFront(3)
    deque.addFront(2)
    deque.addFront(1)
    deque.removeBack()
    const result = deque.peekBack()
    assert.strictEqual(result, 2)
    assert.strictEqual(deque.size(), 2)
})