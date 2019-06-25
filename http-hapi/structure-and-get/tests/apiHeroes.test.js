const assert = require('assert')
const api = require('./../api')
let app = {}

describe('API Heroes test suite', function ()  {
    this.beforeAll(async () => {
        app = await api
    })

    it('GET /heroes', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/heroes'
        })
        const statusCode = result.statusCode 
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(JSON.parse(result.payload)))
    })
})