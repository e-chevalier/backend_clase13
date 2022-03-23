import express from 'express'
import { practica2Controller } from './controllers/practica2Controller.js'

export const practica2Api = (app) => {

    const auth = (req, res, next) => {

        if( req.session?.user === "pepe" && req.session?.admin) {
            return next()
        }

        return res.status(401).send('Error de autorización.')

    }

    let router = express.Router()
    app.use('/api/practica2', router)

    router.get('/', auth, practica2Controller.getPractica2)

    router.get('/login', practica2Controller.login)

    router.get('/olvidar', practica2Controller.olvidar)


}
