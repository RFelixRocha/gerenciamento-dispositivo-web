const request = require('supertest')
const app  = require('../../server');

describe('Test device', () => {

    it('criar um dispositivo', async () => {

        const res = await request(app).post('/api/v1/devices/create').send({
            "category": 1,
            "color": "Azul",
            "partNumber": 685434
        })

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("id")

    })

    it('tenta criar um dispositivo sem a categoria existir', async () => {

        const res = await request(app).post('/api/v1/devices/create').send({
            "category": 100,
            "color": "Azul",
            "partNumber": 685434
        })

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(500)

    })

    it('verificar error ao criar dispositivo com cor com mais 16 caracteres', async () => {

        const res = await request(app).post('/api/v1/devices/create').send({
            "category": 1,
            "color": "maisde16characteres",
            "partNumber": 685434
        })

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(500)
        expect(res.body).toHaveProperty("message")

    })

    it('Verificar retorno da lista de dispositivos', async () => {

        const res = await request(app).get('/api/v1/devices/all')

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(200)

    })

    it('buscar um dispositivo', async () => {

        const res = await request(app).get('/api/v1/devices/search/1')

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(200)

    })

    it('deletar um dispositivo', async () => {

        const res = await request(app).delete('/api/v1/devices/delete/1')

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Dispositivo deletado com sucesso!')
    })

})
