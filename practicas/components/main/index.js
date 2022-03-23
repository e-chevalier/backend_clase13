import express from 'express'
import { mainController } from './controllers/mainController.js'
import { auth } from '../../utils/middleware/auth.js'

export const mainApi = (app) => {

    let router = express.Router()
    app.use('/api/main', router)

    router.get('/', auth, mainController.getMain)
}
