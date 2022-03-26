import express from 'express'
import cors from 'cors'
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import { config } from './config/index.js'
import { config as configAtlas } from './config/mongodbAtlas.js'
import { fb_config } from './config/facebook.js'
import { engine } from 'express-handlebars';
import { serverRoutes } from './routes/index.js'
import { normalize, schema } from "normalizr"
import util from 'util'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import * as User from './models/users.js'
import https from 'https'
import fs from 'fs'


import { productsMemory, productsContainer, messagesMemory, messagesContainer } from './daos/index.js'

// console.log("PRODUCTS MYSQL")
// console.table(await productsContainer.getAll())
// console.log("PRODUCTS MEMORY")
// console.table(await productsMemory.getAll())


// console.log("MESSAGES CONTAINER")
// console.log(await messagesContainer.getAll())
// console.log("MESSAGES MEMORY")
// console.log(await messagesMemory.getAll())

const app = express()
// SERVER HTTPS
const credentials = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const httpsServer = https.createServer(credentials, app);
const io = new IOServer(httpsServer)


// Middlewares
app.use(cors("*"));
app.use(cookieParser())
// Settings
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.static('node_modules/bootstrap/dist'))


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



// CONFIG SESION WITH MONGO STORE
const advanceOptions = { useNewUrlParser: true, useUnifiedTopology: true }

const DB_PASS = configAtlas.db_pass
const DB_DOMAIN = configAtlas.db_domain
const DB_NAME = configAtlas.db_name
const DB_USER = configAtlas.db_user

app.use(session({
    store: MongoStore.create({
        mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_DOMAIN}/${DB_NAME}?retryWrites=true&w=majority`,
        mongoOptions: advanceOptions
    }),
    secret: 'secreto',
    saveUninitialized: false,
    resave: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: true,
        maxAge: 600 * 1000,
        sameSite: 'none'
    }
}))


// CONFIG PASSPORT

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: fb_config.facebookid,
    clientSecret: fb_config.facebooksecret,
    callback: fb_config.facebook_callback,
    //callbackURL: "https://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'emails', 'displayName', 'picture']
},
    (accessToken, refreshToken, profile, done) => {

        process.nextTick(() => {

            const newUser = {
                username: profile.displayName,
                email: "No tiene.",
                password: "No tiene",
                firstname: profile.displayName.split(' ')[0],
                lastname: profile.displayName.split(' ')[1],
                photo: profile.photos[0].value
            }

            User.users.findOneAndUpdate({ id: profile.id }, newUser, { new: true, upsert: true, lean: true }, (err, user) => {
                if (err) {
                    console.log("Error in login FacebookStrategy")
                    return done(err)
                }

                return done(null, user)
            })

        })

    })
)

// Passport middlewares
passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    console.log("deserializeUser");
    console.log(id)
    User.users.findById({ _id: id }, done).lean()
});


serverRoutes(app, passport)


const PORT = config.port

const server = httpsServer.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor https escuchando en el puerto ${server.address().port}
                 Open link to https://localhost:${server.address().port}`)
    }
})

server.on('error', error => console.log(`Error en servidor ${error}`))




/**
 *  Regular expression for check email
 */

const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i


/**
 * Normalizr Schemas 
 * 
 */

const authorSchema = new schema.Entity('author')

const messageSchema = new schema.Entity('message', {
    author: authorSchema
})

const messagesSchema = new schema.Entity('messages', {
    messages: [messageSchema]
})


const print = obj => {
    console.log(util.inspect(obj, false, 12, true))
}

/**
 * SOCKETS
 */

io.on('connection', (socket) => {
    // Emit all Products and Messages on connection.

    (async () => {
        io.sockets.emit('products', await productsMemory.getAll())

        let messagesOriginal = await messagesMemory.getAll()
        let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)

        io.sockets.emit('messages', messagesNormalized)
        console.log('¡Nuevo cliente conectado!')  // - Pedido 1
    })()

    socket.on('newProduct', (prod) => {

        if (Object.keys(prod).length !== 0 && !Object.values(prod).includes('')) {

            (async () => {
                await productsContainer.save(prod)
                await productsMemory.save(prod)
                io.sockets.emit('products', await productsMemory.getAll())
            })()

        }
    })

    socket.on('newMessage', (data) => {

        if (Object.keys(data).length !== 0 && re.test(data.author.id) && !Object.values(data.author).includes('') && data.text !== '') {
            (async () => {
                await messagesMemory.save(data)
                await messagesContainer.save(data)

                let messagesOriginal = await messagesMemory.getAll()
                let messagesNormalized = normalize({ id: 'messages', messages: messagesOriginal }, messagesSchema)
                io.sockets.emit('messages', messagesNormalized)

            })()
        }
    })

})











