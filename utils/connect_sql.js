// require('dotenv').config()
import dotenv from 'dotenv'
import sql from 'mssql'
// const sql = require('mssql')
dotenv.config()

var config = {
    server: process.env.SQLSERVER_NAME,
    database: process.env.SQLSERVER_DB,
    port: 1433,
    options: {
        encrypt: true,
        enableArithAbort: true,
    },
    connectionTimeout: 30000,
    authentication: {
        type: 'default',
        options: {
            userName: process.env.SQLSERVER_USER,
            password: process.env.SQLSERVER_PASS,
        },
    },
}

const sqlPool = new sql.ConnectionPool(config)
const sqlPoolConnect = sqlPool.connect()
sqlPool.on('error', (err) => {
    console.log('Database Connection Failed! Bad Config: ', err)
})

export { sqlPool, sqlPoolConnect }
// module.exports = {
//     sqlPool,
//     sqlPoolConnect,
// }
