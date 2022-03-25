import { loginService } from '../services/loginService.js'

class Login {

    async getLogin(req, res, next) {
        try {
            let {status} = await loginService.getLogin(req)

            console.log(status);

            if ( status == "LOGGEDIN" ) {
                res.redirect('/api/main')
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

            res.redirect('/api/main')
            
        } catch (error) {
            console.log(error);
        }
    }

}

export let loginController = new Login()
