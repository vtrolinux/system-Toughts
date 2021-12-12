const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USER,process.env.MYSQL_PASSWORD,{
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log('conectado ao banco')
} catch (error) {
    console.log('falha de conexao com o banco\nError: '+error)
}
module.exports = sequelize