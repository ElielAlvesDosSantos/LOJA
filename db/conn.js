const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('back','root','senai',{
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('conectado com sucesso!')
// }).catch((error)=>{
//     console.error('Erro de conexão'+error)
// })

module.exports = sequelize