const mysql = require('mysql')
require('dotenv').config();

const pool = mysql.createPool({
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASSWORD,
    database       : process.env.DB_DATABASE,
    connectionLimit: process.env.DB_CONNECTION_LIMIT
})

module.exports = connectionFactory => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
                return
            }
            resolve(connection)
        })
    })
}