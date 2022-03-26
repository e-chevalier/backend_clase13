class Login {

    async getLogin(req) {

        try {
            return { status: "OK" }
        } catch (error) {
            console.log(error);
        }

    }

    async postLogin(req) {

        try {
            const { name } = req.body
            let response = {}

            if (name) {

                if (req.session.counter) {
                    req.session.counter++

                } else {
                    req.session.counter = 1
                    req.session.username = name

                }

                response = { status: "OK" }

            } else {
                response = { status: "BAD" }
            }

            return response

        } catch (error) {
            console.log(error);
        }

    }

}

export let loginService = new Login()