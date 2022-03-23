import express from 'express'
import { practica1Controller } from './controllers/practica1Controller.js'

export const practica1Api = (app) => {

    let router = express.Router()
    app.use('/api/cookies', router)

    router.get('/', practica1Controller.getCookies)
    router.post('/', practica1Controller.createCookie)
    router.delete('/:cookieName?', practica1Controller.deleteCookie)

}
