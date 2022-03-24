import { registrationService } from '../services/registrationService.js'

class Registration {

    async getRegistration(req, res, next) {
        try {
            await registrationService.getRegistration()
            res.render('registration')

        } catch (error) {
            console.log(error)
        }

    }

    async postRegistration(req, res, next) {
        try {
            let response = await registrationService.postRegistration(req)

            if ( response.status == 'OK') {
                res.status(200).redirect('/api/login')
            } else {
                console.log(response.error)
                res.status(400).redirect('/api/registration')
            }
            

        } catch (error) {
            console.log(error)
        }

    }

}

export let registrationController = new Registration()
