const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')

describe('/produtos', () => {
    it('Deve criar um novo produto', done => {
        request(app)
            .post('/produtos')
            .set('Accept', 'application/json')
            .send({
                titulo: "zzzz",
                descricao: "zzzz",
                preco: 10
            })
            .end((err, response) => {
                expect(response.body.id).to.be.an('number')
                expect(response.body.titulo).eq("zzzz")
                expect(response.body.descricao).eq("zzzz")
                expect(response.body.preco).eq(10)
                done()
            })
    })

    it('Deve retornar uma lista de produtos', done => {
        request(app)
            .get('/produtos')
            .set('Accept', 'application/json')
            .end((err, response) => {
                expect(response.body.livros).to.be.an('array')
                expect(response.body.livros[0]).have.own.property('id')
                expect(response.body.livros[0].id).to.be.an('number')

                done()
            })
    })

    // it.only --> para que somente o caso de teste em questão seja executado.
})