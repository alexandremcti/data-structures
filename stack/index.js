class Stack {
    constructor() {
        this._count = 0;
        this._peaces = {};
    }

    isEmpty() {
        return this._count === 0;
    }

    push(item) {
        this._peaces[this._count] = item;
        this._count += 1;
    }

    size() {
        return this._count;
    }

    peek() {
        return this._peaces[this._count - 1];
    }

    pop() {
        this._count--;
        return this._peaces[this._count];
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        let objString = `${this._peaces[0]}`
        for (let i = 1; i < this._count; i++) {
            objString = `${objString},${this._peaces[i]}`
        }
        return objString;
    }
}


//convert decimal number to binary
const baseConverter = (decNumber, base) => {
    let stack = new Stack();
    const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let number = decNumber;
    let rem;
    let baseString = '';
    if (!(base >= 2 && base <= 36)) return '';
    while (number > 0) {
        rem = Math.floor(number % base);
        number = Math.floor(number / base);
        stack.push(rem);
    }
    while (!stack.isEmpty()) {
        baseString += digits[stack.pop()];
    }
    return baseString;
}

const hanoiStack = (pratos, origem, helper, destino, torreOrigem, torreHelper, torreDestino, movimentos = []) => {
    if (pratos <= 0) return movimentos;
    if (pratos === 1) {
        destino.push(origem.pop());
        const movimento = {};
        movimento[torreOrigem] = origem.toString();
        movimento[torreHelper] = helper.toString();
        movimento[torreDestino] = destino.toString();
        movimentos.push(movimento)
    } else {
        hanoiStack(pratos - 1, origem, destino, helper, torreOrigem, torreDestino, torreHelper, movimentos);
        destino.push(origem.pop());
        const movimento = {};
        movimento[torreOrigem] = origem.toString();
        movimento[torreHelper] = helper.toString();
        movimento[torreDestino] = destino.toString();
        movimentos.push(movimento)
        hanoiStack(pratos - 1, helper, origem, destino, torreHelper, torreOrigem, torreDestino, movimentos);
    }
    return movimentos
}



const torreOrigem = new Stack();
const torreHelper = new Stack();
const torreDestino = new Stack();

const pratos = 3
for (let indice = pratos; indice > 0; indice--) {
    torreOrigem.push(indice)
}

const movimentos = hanoiStack(pratos, torreOrigem, torreHelper, torreDestino, 'torreOrigem', 'torreHelper', 'torreDestino')
console.log(movimentos);


