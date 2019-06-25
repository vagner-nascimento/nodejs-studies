const Hapi = require('hapi')
const Context = require('./src/db/strategies/base/contextStrategy')
const MongoDB = require('./src/db/strategies/mongodb/mongoDbStrategy')
const HeroSchema = require('./src/db/strategies/mongodb/schemas/heroSchema')
const HeroRoutes = require('./src/routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes (instance, methods) { //NOTE: This auxiliary function dynamically creates the routes, which can be 0 or N
    return methods.map(method => instance[method]())
}

async function main() {
    
    const connection = MongoDB.connect()
    const mongoDb = new Context(new MongoDB(connection, HeroSchema))

    app.route([
        ...mapRoutes(new HeroRoutes(mongoDb), HeroRoutes.methods())
        //NOTE: spread operator: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
        // It iterates between 0 or N array's elements.
        // In this case it iterates a String array with the route's names
    ])

    await app.start()
    console.log('server running at', app.info.port)

    return app;
}

module.exports = main()
