import { mainService } from '../services/mainService.js'


class Main {

    async getMain(req, res, next) {
        try {
            //let {status, data} = await mainService.getMain(req)
            //let response = await mainService.getMain(req)
            console.log("Before render main")
            res.render('main', { ...req.user })
            // , data )
            
        } catch (error) {
            console.log(error);
        }
    }

}

export let mainController = new Main()
