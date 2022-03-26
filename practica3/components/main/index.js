import express from 'express'
import { mainController } from './controllers/mainController.js'


export const mainApi = (app) => {

    let router = express.Router()
    app.use('/api/main', router)

    router.get('/', mainController.getMain)
}
