
import { usersContainer, usersMemory } from '../../../daos/index.js'

class Registration {

    async getRegistration() {
        try {
            console.log(`registration get`)
            return { status: "OK" }
        } catch (error) {
            console.log(error)
        }
    }

    async postRegistration(req) {
        try {
            console.log(`registration post`)
            let response = {status: 'OK'}
           
            console.log(req.user)

            return response
            
        } catch (error) {
            console.log(error)
        }
    }

}

export let registrationService = new Registration()