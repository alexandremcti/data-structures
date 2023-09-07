import test from 'node:test'
import assert from 'node:assert'
import { Queue } from './queue-with-map.js'

class HotPotato {
    constructor(players = [], count = 0) {
        this.players = players
        this.count = count
        this.queue = new Queue()
        this.loosers = []
    }

    initGame(){
        for(let player in this.players){
            this.queue.enqueue(player)
        }
        let continueGame = true
        while (this.queue.size() > 1) {
            for(let index = 0; index < this.count; index++){
                this.queue.enqueue(this.queue.dequeue())
            }
            this.loosers.push(this.queue.dequeue())
        }
        this.winner = this.queue.dequeue()
        return this
    }

    getResults(){
        return {
            loosers: this.loosers,
            winner: this.winner
        }
    }


}

test('deve retornar um vencendor e os perdedores do jogo', () => {
    const players = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10']
    const count = 15
    const hotPotato = new HotPotato(players, count)
    const result = hotPotato.initGame().getResults()
    assert.ok(typeof result.winner === 'string')
    assert.strictEqual(result.loosers.length, 9)
})