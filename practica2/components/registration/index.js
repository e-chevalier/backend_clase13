import express from 'express'
import { registrationController } from './controllers/registrationController.js'

export const registrationApi = (app) => {

    let router = express.Router()
    app.use('/api/registration', router)

    router.get('/', registrationController.getRegistration)
    router.post('/', registrationController.postRegistration)

}
