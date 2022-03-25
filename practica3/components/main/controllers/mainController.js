import { mainService } from '../services/mainService.js'


class Main {

    async getMain(req, res, next) {
        try {
            let {status, data} = await mainService.getMain(req)
            console.log(req.data)
            res.render('main', data )
            
        } catch (error) {
            console.log(error);
        }
    }

}

export let mainController = new Main()
