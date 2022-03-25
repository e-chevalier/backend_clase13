import express from 'express'
import passport from 'passport'
import { authFacebookController } from './controllers/authFacebookController.js'

export const authFacebookApi = (app) => {

    let router = express.Router()
    app.use('/auth/facebook', router)

    router.get('/', passport.authenticate('facebook'))
    router.get('/callback', passport.authenticate('facebook', { successRedirect: '/api/main', failureRedirect: '/api/login'}))

}
