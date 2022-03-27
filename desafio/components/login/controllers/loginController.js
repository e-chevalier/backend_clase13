import { loginService } from '../services/loginService.js'

class Login {

    async getLogin(req, res, next) {
        try {
            let {status} = await loginService.getLogin(req)

            console.log(status);
            console.log("Status Code:")
            console.log(req.statusCode)

            if ( status == "LOGGEDIN" ) {
                res.redirect('/api/viewOne')
            } else {
                res.render('login')
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    async postLogin(req, res, next) {
        try {
            const { user } = await loginService.postLogin(req)

            res.redirect('/api/viewOne')
            
        } catch (error) {
            console.log(error);
        }
    }

}

export let loginController = new Login()
