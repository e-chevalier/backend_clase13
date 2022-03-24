
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
            let response = {}
            
            const { name, email, password } = req.body

            if( name && email && password) {
                usersContainer.save({name: name, email: email, password: password})
                usersMemory.save({name: name, email: email, password: password})
                response = {status: 'OK'}
            } else {
                response = {status: 'BAD', error: `Missing value from register form => name: ${name}, email:${email}, password:${password}`}
            }

            return response
            
        } catch (error) {
            console.log(error)
        }
    }

}

export let registrationService = new Registration()