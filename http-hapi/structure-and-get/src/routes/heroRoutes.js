const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() { //NOTE: When a new method is added here, it will be automatically added to the app.routes[]
        return {
            path: '/heroes',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read() //NOTE: The hapi resolves promises by default, then we don't need to explicit do that
            }
        }
    }   
}

module.exports = HeroRoutes