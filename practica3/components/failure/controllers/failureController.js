import { failureService } from '../services/failureService.js'

class Failure {
    async getFailure(req, res, next) {
        try {
            let response = await failureService.getFailure()
            
            res.render('failure')

        } catch (error) {
            console.log(error)
        }

    }

}

export let failureController = new Failure()
