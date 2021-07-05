const request = require('supertest')
const app  = require('../../server');

describe('Test category', () => {

    it('criar uma categoria', async () => {

        const res = await request(app).post('/api/v1/categories/create').send({
            "name": "Azul"
        })
        const res1 = await request(app).post('/api/v1/categories/create').send({
            "name": "Amarelo"
        })
        const res2 = await request(app).post('/api/v1/categories/create').send({
            "name": "Vermelho"
        })


        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("id")

    })

    it('buscar uma categoria', async () => {

        const res = await request(app).get('/api/v1/categories/search/1')

        expect(res).toBeDefined();
        expect(res.body).toHaveProperty("id")

    })

    it('Verificar retorno da lista de categorias', async () => {

        const res = await request(app).get('/api/v1/categories/all')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)

    })

    it('deletar uma categoria', async () => {

        const res = await request(app).delete('/api/v1/categories/delete/2')

        expect(res).toBeDefined();
        expect(res.statusCode).toEqual(200)
        expect(res.body.message).toBe('Categoria deletada com sucesso!')
    })

})
