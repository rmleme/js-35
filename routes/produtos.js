module.exports = app => {

    const produtosDAO = app.infra.produtosDAO

    app.get('/produtos', (req, res, next) => {
        produtosDAO.pegaTodos()
            .then(result => res.render('produtos/lista.ejs', { livros: result }))
            .catch(err => next(err))
    })

    app.post('/produtos', (req, res, next) => {
        produtosDAO
            .insereLivro(req.body)
            .then(result => res.redirect('/produtos'))
            .catch(err => next(err))
    })

    app.get('/produtos/form', (req, res) => {
        res.render('produtos/form.ejs')
    })

    app.get('/produtos/:id', (req, res, next) => {
        produtosDAO.pegaTodosPorId(req.params.id)
            .then(result => res.render('produtos/lista.ejs', { livros: result }))
            .catch(err => next(err))
    })

}