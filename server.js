const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')

//salvar sessoes em arquivos no servidor
const FileStore = require('session-file-store')(session)

require('dotenv').config()

const app = express()

const connection = require('./db/connection')

//models
const Tought = require('./models/Tought')
const User = require('./models/User')

//routes
const toughtRoutes = require('./routes/toughtsRouters')
const ToughtController = require('./controllers/ToughtController') // para acessar a /

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//body parser, necessario para se trabalhar com forms
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(express.static('public'))


//session middleware
app.use(session({
    name: 'session',
    secret: 'segredo_segredinho',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('path').join(require('os').tmpdir(),'sessions') //diretorio que serao salvos as sessoes dos usuarios
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now()+360000),
        httpOnly: true //em producao trocar para https
    }
}))

// flash messages
app.use(flash())

//garantir que tenhamos o userid a cada request
app.use((req, res, next) =>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

//Routes
app.use('/toughts', toughtRoutes)
app.get('/', ToughtController.showToughts)

//connection.sync({force: true})
connection.sync()
    .then(() =>{
        app.listen(3000)
    })
    .catch((err) => {console.log(err)})