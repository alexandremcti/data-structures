class Queue {
    count = 0;
    lowerCount = 0;
    items = {};

    enqueue(item) {
        this.items[this.count] = item;
        this.count++;
    }

    dequeue() {
        if (this.isEmpty()) return undefined
        const item = this.items[this.lowerCount];
        delete this.items[this.lowerCount];
        this.lowerCount++
        return item;
    }

    size() {
        return this.count - this.lowerCount
    }

    peek() {
        return this.items[this.lowerCount]
    }

    isEmpty() {
        return this.size() <= 0
    }

    clear() {
        this.items = {}
        this.count = 0
        this.lowerCount = 0
    }

    toString() {
        if (this.isEmpty()) return ''
        const firstItem = this.items[this.lowerCount]
        let items = `${firstItem}`
        for (let i = this.lowerCount + 1; i < this.count; i++) {
            items = `${items}, ${this.items[i]}`
        }
        return items;
    }
}


const queue = new Queue()
console.log('is empty ', queue.isEmpty())
queue.enqueue(4)
queue.enqueue(8)
queue.enqueue(5)


console.log('size', queue.size())
console.log('first', queue.peek())
console.log('is empty ', queue.isEmpty())
console.log('items ', queue.toString())

queue.dequeue()

console.log('size', queue.size())
console.log('first', queue.peek())
console.log('is empty', queue.isEmpty())
console.log('items ', queue.toString())


queue.clear()
console.log('size', queue.size())
console.log('first', queue.peek())
console.log('is empty', queue.isEmpty())
console.log('items ', queue.toString())

