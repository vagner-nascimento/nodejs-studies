const assert = require('assert')
const api = require('./../api')
let app = {}

function insert() {
    return app.inject({
        method: 'POST',
        url: '/heroes',
        payload: {
            nome: 'Flash',
            poder: 'Speed'
        }
    });
}

describe.only('API Heroes test suite', function ()  {
    
    this.beforeAll(async () => {
        app = await api
        const result = await insert()
        MOCK_ID = JSON.parse(result.payload)._id
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

    it('POST /heroes', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: {
                nome: 'Flash',
                poder: 'Speed'
            }
        })

        assert.deepEqual(result.statusCode, 200)
        assert.deepEqual(JSON.parse(result.payload).nome, "Flash")

    })

    it('POST should not insert with wrong payload', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/heroes',
            payload: {
                NAME: 'Flash'
            }
        })

        const payload = JSON.parse(result.payload)
        assert.deepEqual(result.statusCode, 400)
        assert.ok(payload.message.search('"nome" is required') !== -1)
    })

    it('PATCH /heroes/{id}', async () => {
        const result = await app.inject({
            method: 'PATCH',
            url: `/heroes/${MOCK_ID}`,
            payload: {
                nome: 'Marvel Captain',
                poder: 'All'
            }
        })
        assert.deepEqual(result.statusCode, 200) 
        assert.deepEqual(JSON.parse(result.payload).nModified, 1)
    })

    it('DELETE /heroes/{id}', async () => {
        const result =  await app.inject({
            method: 'DELETE',
            url: `/heroes/${MOCK_ID}` 
        })
        assert.deepEqual(result.statusCode, 200) 
        assert.deepEqual(JSON.parse(result.payload).n, 1)
    })
})
