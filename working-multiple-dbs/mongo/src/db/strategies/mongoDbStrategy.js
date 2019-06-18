const ICrud = require('./base/interfaceDb')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Disconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Disconectando',
}
class MongoDB extends ICrud {
    constructor() {
        super()
        this._heroes = null
        this._driver = null
    }
    
    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]

    }
    
    defineModel() {
        const heroSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })
        
        //mocha workaround
        this._heroes = Mongoose.models.heroes || Mongoose.model('heroes', heroSchema)
    }

    connect() {
        Mongoose.connect('mongodb://app:app@localhost:27017/heroes', {
            useNewUrlParser: true
        }, function (error) {
            if (!error) return;
            console.log('Falha na conexão!', error)
        })

        this._driver = Mongoose.connection
        this._driver.once('open', () => console.log('database rodando!!'))
        this.defineModel()
    }

    async create(item) {
        return this._heroes.create(item)
    }

    async read(item = {}) {
        return this._heroes.find(item, { nome: 1, poder: 1, insertedAt: 1})
    }

    async update(id, item) {
        return this._heroes.updateOne({_id: id}, { $set: item})
    }
    
    async delete(id) {
        return this._heroes.deleteOne({_id: id})
    }
}

module.exports = MongoDB
