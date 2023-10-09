const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bcrypt = require('bcrypt')

const conn = require('./db/conn')
const Cliente = require('./models/Cliente')
const Produto = require('./models/Produto')

const PORT = 3000
const hostname = 'localhost'

let log = false

//-----------------CONFIG EXPRESS------------

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

//----------------HANDLEBARS------------
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//----------------------------------------

app.post('/login', async(req, res) => {
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Cliente.findOne({raw: true, where:{email:email, senha:senha}})
    console.log(pesq)
    if(pesq == null){
        console.log('Usuario não encontrado')
        res.status(200).redirect('/')
    }else if(pesq.email == email && pesq.senha == senha){
        console.log('Usuario encontrado')
        log = true
        res.render('home', {log})
    }else{
        res.status(200).redirect('/')

    }
})

app.get('/login', (req, res) => {
    res.render('login', { log })
})
app.get('/', (req, res) => {
    res.render('home', { log })
})

//------------------------------------------

conn.sync().then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando ${hostname}:${PORT}`)
    })
}).catch((error) => {
    console.error('Falha de conexão' + error)
})

