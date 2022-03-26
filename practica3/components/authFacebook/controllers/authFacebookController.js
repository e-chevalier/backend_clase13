import { authFacebookService } from '../services/authFacebookService.js'

class AuthFacebook {
    async redirect(req, res, next) {
        try {
            let response = await authFacebookService.redirect()
            console.log(req.user)
            res.render('main', {...req.user})
        } catch (error) {
            console.log(error)
        }

    }

}

export let authFacebookController = new AuthFacebook()
