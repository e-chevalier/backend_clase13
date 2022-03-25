import { democomponentService } from '../services/democomponentService.js'

class Democomponent {
    async test(req, res, next) {
        try {
            let response = await democomponentService.test()
            res.json(response)
        } catch (error) {
            console.log(error)
        }

    }

}

export let democomponentController = new Democomponent()
