import { authFacebookService } from '../services/authFacebookService.js'

class AuthFacebook {
    async test(req, res, next) {
        try {
            let response = await authFacebookService.test()
            res.json(response)
        } catch (error) {
            console.log(error)
        }

    }

}

export let authFacebookController = new AuthFacebook()
