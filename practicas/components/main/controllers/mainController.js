import { mainService } from '../services/mainService.js'


class Main {

    async getMain(req, res, next) {
        try {
            let {status, user} = await mainService.getMain(req)
            res.render('main', {name: user.name, email: user.email, password: user.password, counter: user.counter} )
            
        } catch (error) {
            console.log(error);
        }
    }

}

export let mainController = new Main()
