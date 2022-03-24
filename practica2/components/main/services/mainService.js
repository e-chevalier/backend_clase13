import { usersMemory } from '../../../daos/index.js'

class Main {

    async getMain(req) {

        try {

            if (req.session.counter) {
                req.session.counter++
            } else {
                req.session.counter = 1
            }
   
            return { status: "OK", data: { ...req.user, counter: req.session.counter } }

        } catch (error) {
            console.log(error);
        }

    }

}

export let mainService = new Main()