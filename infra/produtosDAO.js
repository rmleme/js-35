const connectionFactory = require('./connectionFactory')

module.exports = {

    pegaTodos: async () => {
        const connection = await connectionFactory()
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM livros',
                (err, result) => {
                    connection.release();
                    if (err) {
                        return reject(err)
                    }
                    resolve(result)
                })
        })
    },

    pegaTodosPorId: async id => {
        const connection = await connectionFactory()
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM livros WHERE id = ${id}`,
                (err, result) => {
                    connection.release();
                    if (err) {
                        return reject(err)
                    }
                    resolve(result)
                })
        })
    },

    insereLivro: async livro => {
        const connection = await connectionFactory()
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO livros SET ?', livro,
                (err, result) => {
                    connection.release();
                    if (err) {
                        return reject(err)
                    }
                    resolve(result)
                })
        })
    }

}