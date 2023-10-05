const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const Cliente = require('./Cliente')
const Produto = db.define('produto',{
    nome:{
        type: DataTypes.STRING(30)
    },
    quantidade:{
        type: DataTypes.INTEGER
    },
    preço:{
        type: DataTypes.FLOAT
    }
},{
    createdAt: false,
    updatedAt: false
})

Cliente.hasOne(Produto)
Produto.belongsTo(Cliente)

// Produto.sync({force:true})

module.exports = Produto