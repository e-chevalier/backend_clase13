class Main {

    async getMain(req) {

        try {
           
            if (req.isAuthenticated()) {
                console.log("Usuario logueado")

                if (req.session.counter) {
                    req.session.counter++
                } else {
                    req.session.counter = 1
                }

            } else {
                console.log("Usuario no logueado")
            }

            return { status: "OK" }

        } catch (error) {
            console.log(error);
        }

    }

}

export let mainService = new Main()