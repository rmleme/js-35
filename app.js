const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const cors = require('cors')

const app = express()

// app.use: middlewares. A ordem de declaração importa!
app.use(cors())   // Evitar definir o cors global quando envolve HTML
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

consign()
    .include('infra')
    .then('routes')
    .into(app)

app.use((req, res, next) => {
    const msg = `Recurso não encontrado: ${req.originalUrl}`
    res.status(404).render('erros/404.ejs', { msg })
    console.warn(msg)
})

app.use((error, req, res, next) => {
    res.status(500).render('erros/500.ejs', { error })
    console.error(error)
})

module.exports = app