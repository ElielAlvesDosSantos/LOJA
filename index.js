const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bcrypt = require('bcrypt')

const conn = require('./db/conn')
const Cliente = require('./models/Cliente')
const Produto = require('./models/Produto')

const PORT = 3000
const hostname = 'localhost'
//-----------------CONFIG EXPRESS------------
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
//----------------HANDLEBARS------------
app.set('view engine','handlebars')
app.engine('handlebars',exphbs.engine())
//----------------------------------------
app.get('/',(req,res)=>{
    res.render('home')
})
//------------------------------------------
conn.sync().then(()=>{
    app.listen(PORT,hostname, ()=>{
        console.log(`servidor rodando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('falha de conexão'+error)
})

