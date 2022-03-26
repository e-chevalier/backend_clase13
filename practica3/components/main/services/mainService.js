class Main {

    async getMain(req) {

        try {

            // if (req.session.counter) {
            //     req.session.counter++
            // } else {
            //     req.session.counter = 1
            // }

            // if (req.isAuthenticated()) {
            //     console.log("Usuario logueado")
            //  //   response = { status: "LOGGEDIN"}
            // } else {
            //     console.log("Usuario no logueado")
            //  //   response = { status: "NOTLOGGEDIN" }
            // }

            // console.log("REQ USER EN MAIN:")
            // console.log(req.user)
            // console.log("Passport")
            // console.log(req.session)
   
            return { status: "OK" }
            // , data: { ...req.user, counter: req.session.counter } }

        } catch (error) {
            console.log(error);
        }

    }

}

export let mainService = new Main()