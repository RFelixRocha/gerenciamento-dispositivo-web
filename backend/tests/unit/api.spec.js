const request = require('supertest')
const app  = require('../../server');

describe('Test de funcionamento da API', () => {

    it('verificar acesso a API', async () => {

        const res = await request(app).get('/api')
        expect(res.body).toHaveProperty('message')

    })

})
