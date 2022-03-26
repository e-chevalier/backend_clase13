import express from 'express'
import { authFacebookController } from './controllers/authFacebookController.js'

export const authFacebookApi = (app, passport) => {

    let router = express.Router()
    app.use('/auth/facebook', router)

    router.get('/', passport.authenticate('facebook'))
    //router.get('/callback', passport.authenticate('facebook', { failureRedirect: '/api/failure'}), authFacebookController.redirect)
    router.get('/callback', passport.authenticate('facebook', { successRedirect: '/api/main', failureRedirect: '/api/failure'}))

}
