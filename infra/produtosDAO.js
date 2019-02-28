const connectionFactory = require('./connectionFactory')

module.exports = {

    pegaTodos: () => {
        const connection = connectionFactory()
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM livros', (err, result) => {
                connection.end();
                if (err) {
                    return reject(err)
                }
                resolve(result)
            })
        })
    },

    pegaTodosPorId: id => {
        const connection = connectionFactory()
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM livros WHERE id = ${id}`, (err, result) => {
                connection.end();
                if (err) {
                    return reject(err)
                }
                resolve(result)
            })
        })
    },

    insereLivro: (livro) => {
        const connection = connectionFactory()
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO livros SET ?', livro,
            (err, result) => {
                connection.end();
                if (err) {
                    return reject(err)
                }
                resolve(result)
            })
        })
    }

}