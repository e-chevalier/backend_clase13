import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { serverRoutes } from './routes/index.js'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import * as User from './models/users.js'
import https from 'https'
import fs from 'fs'



const PORT = config.port

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
    clientID: config.facebookid,
    clientSecret: config.facebooksecret,
    callbackURL: "https://localhost:8080/auth/facebook/callback",
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


// SERVER HTTPS

const credentials = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


const httpsServer = https.createServer(credentials, app);

const server = httpsServer.listen(PORT, 'localhost', (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor https escuchando en el puerto ${server.address().port}
                 Open link to https://localhost:${server.address().port}`)
    }
})

server.on('error', error => console.log(`Error en servidor ${error}`))