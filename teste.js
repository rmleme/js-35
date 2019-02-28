const http = require('http') // var, let e const

var rotas = {}
rotas['/'] = rotaHome
rotas['/produtos'] = rotaProdutos

const app = http.createServer((request, response) => {

    if (rotas[request.url] !== undefined) {
        rotas[request.url](response);
    } else {
        response.end('<h1>Recurso não encontrado!</h1>') 
    }

    // Rota da home
    // if (request.url === '/') {
    //     response.end('<h1>Home</h1>')
    //     return
    // }

    // // Rota de produtos
    // if (request.url === '/produtos') {
    //     response.end('<h1>Produtos</h1>')
    //     return
    // }

    // response.end('<h1>Recurso não encontrado!</h1>')
})

function rotaHome(response) {
    response.end('<h1>Home</h1>')
    return
}

function rotaProdutos(response) {
    response.end('<h1>Produtos</h1>')
    return
}

const port = 3000
app.listen(port, () => console.log(`O servidor subiu em http://localhost:${port}`))