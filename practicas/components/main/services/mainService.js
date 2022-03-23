import { usersMemory } from '../../../daos/index.js'

class Main {

    async getMain(req) {

        try {

            let users = await usersMemory.getAll()

            let user = users.find(user => user.name == req.session.username)


            console.log(user)

            return { status: "OK", user: user }
        } catch (error) {
            console.log(error);
        }

    }

}

export let mainService = new Main()