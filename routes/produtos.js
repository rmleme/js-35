const Joi = require('joi')

module.exports = app => {

    const produtosDAO = app.infra.produtosDAO

    app.get('/produtos', (req, res, next) => {
        produtosDAO.pegaTodos()
            .then(result => {
                const livros = result
                res.format({
                    html: () => res.render('produtos/lista.ejs', { livros }),
                    json: () => {
                        // res.append("Access-Control-Allow-Origin", "[*]")
                        res.send({ livros })
                    }
                })
            })
            .catch(err => next(err))
    })

    app.post('/produtos', (req, res, next) => {
        const insereLivroSchema = Joi.object().keys({
            titulo: Joi.string().required(),
            preco: Joi.number().min(0).required(),
            descricao: Joi.string()
        })

        const result = Joi.validate(req.body, insereLivroSchema, { abortEarly: false })
        if (result.error) {
            res.status(400)
            res.format({
                html: () => {
                    res.render('produtos/form.ejs', {
                        errors: result.error.details,
                        values: result.value
                    })
                },
                json: () => res.send({ values: result.error.details })
            })
            return
        }

        const livroDTO = {
            titulo: req.body.titulo,
            preco: req.body.preco,
            descricao: req.body.descricao
        }

        produtosDAO
            .insereLivro(livroDTO)
            .then(result => {
                res.status(201)
                res.format({
                    html: () => res.redirect('/produtos'),
                    json: () => {
                        // res.append("Access-Control-Allow-Origin", "[*]")
                        livroDTO.id = result.insertId
                        res.send(livroDTO)
                    }
                })
            })
            .catch(err => next(err))
    })

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form.ejs', { values: {} })
    })

    app.get('/produtos/:id', (req, res, next) => {
        produtosDAO.pegaTodosPorId(req.params.id)
            .then(result => res.render('produtos/lista.ejs', { livros: result }))
            .catch(err => next(err))
    })

}