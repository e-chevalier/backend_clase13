import { mainService } from '../services/mainService.js'


class Main {

    async getMain(req, res, next) {

        try {

            let response = await mainService.getMain(req)
            console.log("Before render main")
            console.log(req.user)
            res.render('main', { ...req.user, counter: req.session.counter })

        } catch (error) {
            console.log(error);
        }
    }

}

export let mainController = new Main()
