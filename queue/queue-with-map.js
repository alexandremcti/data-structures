import test from 'node:test'
import assert from 'node:assert'

const _itens = new WeakMap(); 
const _count = new WeakMap();
const _lowestCount = new WeakMap();

export class Queue {
    constructor() {
        _itens.set(this, {})
        _count.set(this, 0);
        _lowestCount.set(this, 0); 
    }

    #setCount(value) {
        _count.delete(this)
        _count.set(this, value)
    }

    #getCount() {
        return _count.get(this)
    }

    #setLowestCount(value){
        _lowestCount.delete(this)
        _lowestCount.set(this, value)
    }

    #getLowestCount(){
        return _lowestCount.get(this)
    }

    #setItens(value){
        _itens.delete(this)
        _itens.set(this, value)
    }

    #getItens(){
        return _itens.get(this)
    }

    enqueue(item){
        const itens = this.#getItens()
        let count = this.#getCount()
        itens[count] = item
        this.#setCount(count += 1)
        this.#setItens(itens)
    }

    peek() {
        const itens = this.#getItens()
        const lowerstCount = this.#getLowestCount()
        return itens[lowerstCount]
    }

    dequeue(){
        const itens = this.#getItens()
        let lowerstCount = this.#getLowestCount()
        const result = itens[lowerstCount]
        delete itens[lowerstCount]
        this.#setLowestCount(lowerstCount += 1)
        this.#setItens(itens)
        return result
    }

    size(){
        const count = this.#getCount()
        const lowerstCount = this.#getLowestCount()
        return count - lowerstCount;
    }
    
    toString(){
        const itens = this.#getItens()
        const itensList = Object.values(itens)
        return itensList.toString()
    }

    isEmpty(){
        const itens  = this.#getItens()
        if (Object.values(itens).length > 0) return true
        return false
    }

    clear(){
        this.#setCount(0)
        this.#setItens({})
        this.#setLowestCount(0)
    }
}

test('deve retornar o primeiro valor inserido', (t) => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    const result = queue.peek()
    assert.strictEqual(result, 1)
})


test('deve remover o primeiro da fila', (t) => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    const removed = queue.dequeue()
    const result = queue.peek()
    assert.strictEqual(result, 2)
    assert.strictEqual(removed, 1)
})

test('deve retornar o tamanho da fila', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.dequeue()
    const result = queue.size()
    assert.strictEqual(result, 2)
})

test('deve imprimir todos os itens da fila', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    const result = queue.toString()
    assert.strictEqual(result, "1,2,3")
})

test('deve verificar se a fila está vazia', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    const result = queue.isEmpty()
    assert.strictEqual(result, true)
})


test('deve limpar a fila', () => {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    queue.clear()
    const result = queue.size()
    assert.strictEqual(result, 0)
})

