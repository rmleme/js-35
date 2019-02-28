// 1 - Sempre procura uma lib do core (http, fs)
// 2 - package.json
// 3 - Arquivos seus, sempre passa o caminho relativo
const app = require('./app')

const port = 3000
app.listen(port, () => console.log(`O servidor subiu em http://localhost:${port}`))