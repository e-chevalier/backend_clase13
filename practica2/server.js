import express from 'express'
import config from './config/index.js'
import cors from 'cors'
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { serverRoutes } from './routes/index.js'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bCrypt from 'bcrypt'
//import { usersContainer, usersMemory } from './daos/index.js'
import * as User from './models/users.js'


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
    resave: true,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600 * 1000,
        sameSite: true
    }
}))

// CONFIG PASSPORT

passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.users.findOne({ username: username }, (err, user) => {

            if (err) {
                console.log("Error in login LocalStrategy")
                return done(err)
            }

            if (!user) {
                console.log("User Not Found with username: " + username);
                return done(null, false)
            }

            if (!isValidPassword(user, password)) {
                console.log("Invalid Password");
                return done(null, false)
            }

            return done(null, user)
        })
    })
)

passport.use('signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        User.users.findOne({ username: username }, (err, user) => {

            if (err) {
                console.log("Error en signup LocalStrategy " + err);
                return done(err)
            }

            if (user) {
                console.log('User already exists');
                return done(null, false)
            }

            const newUser = {
                username: username,
                password: createHash(password),
                email: req.body.email,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            }

            User.users.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Error in Saving user: ' + err);
                    return done(err);
                }
                console.log(user)
                console.log('User Registration succesful');
                return done(null, userWithId);
            });
        })
    })
)


const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}


const isValidPassword = (user, password) => {
    return bCrypt.compareSync(password, user.password);
}

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.users.findById(id, done).lean()
});

app.use(passport.initialize());
app.use(passport.session());

serverRoutes(app, passport)

const server = app.listen(PORT, (err) => {
    if (err) {
        console.log("Error while starting server")
    } else {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}
                 Open link to http://127.0.0.1:${server.address().port}`)
    }
})


server.on('error', error => console.log(`Error en servidor ${error}`))