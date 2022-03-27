class ViewOne {

    async getViewOne(req) {
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
            
            console.log(req.user)
            return { status: "OK", data: {...req.user, counter: req.session.counter} }
        } catch (error) {
            console.log(error);
        }
    }

}

export let viewOneService = new ViewOne()