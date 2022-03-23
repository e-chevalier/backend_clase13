import { usersMemory } from '../../../daos/index.js'

class Main {

    async getMain(req) {

        try {

            let users = await usersMemory.getAll()

            let user = users.find(user => user.name == req.session.username)

            if ( req.session.counter >= 0 ) { 
                req.session.counter++ 
            }

            return { status: "OK", user: { ...user, counter: req.session.counter } }

        } catch (error) {
            console.log(error);
        }

    }

}

export let mainService = new Main()