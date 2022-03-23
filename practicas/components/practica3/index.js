import express from 'express'
import { practica3Controller } from './controllers/practica3Controller.js'

export const practica3Api = (app) => {

    const auth = (req, res, next) => {

        if( req.session?.user === "pepe" && req.session?.admin) {
            return next()
        }

        return res.status(401).send('Error de autorización.')

    }

    let router = express.Router()
    app.use('/api/practica3', router)

    router.get('/', auth, practica3Controller.getPractica3)

    router.get('/login', practica3Controller.login)

    router.get('/olvidar', practica3Controller.olvidar)


}
