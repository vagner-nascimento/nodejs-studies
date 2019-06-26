const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }
    //NOTE: When a new method is added here, it will be automatically added to the app.routes[]
    list() {
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read() //NOTE: The hapi resolves promises by default, then we don't need to explicit do that
            }
        }
    }
    
    create() {
        return {
            path: '/heroes',
            method: 'POST',
            config: {
                validate: { //NOTE: Payload (body) validation
                    failAction: (request, h, err) => {
                        throw err;
                      },
                    payload: {
                        nome: Joi.string().max(100).required(),
                        poder: Joi.string().max(30).required()
                    }
                },
            },
            handler: (request, headers) => {
                const payload = request.payload
                return this.db.create(payload)
            }
        }
    }
}

module.exports = HeroRoutes
