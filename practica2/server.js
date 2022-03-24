import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { serverRoutes } from './routes/index.js'
import MongoStore from 'connect-mongo'


const PORT = config.port

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))
app.use(cookieParser())
app.use(cors("*"))



// defino el motor de plantilla
app.engine('.hbs', engine({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutDir: "views/layouts/",
    partialsDir: "views/partials/"
})
)

app.set('views', './views'); // especifica el directorio de vistas
app.set('view engine', '.hbs'); // registra el motor de plantillas




const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const DB_PASS = config.db_pass
const DB_DOMAIN = config.db_domain
const DB_NAME = config.db_name
const DB_USER = config.db_user

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    saveUninitialized: false,
    resave: true,
    rolling: true,
    cookie: { 
        maxAge: 600 * 1000,
        sameSite: true
    }
}))

serverRoutes(app)

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
    }  
})


server.on('error', error => console.log(`Error en servidor ${error}`))