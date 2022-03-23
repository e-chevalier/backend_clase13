
class Practica3 {

    async getPractica3(req) {

        try {
            const { name } = req.query
            let message = ''
            
            if (req.session.counter) {
                req.session.counter++
                message = name? `${name} visitaste la pagina ${req.session.counter} veces.` :
                `Visitaste la pagina ${req.session.counter} veces.`
            } else {
                // Declare Variable.
                req.session.counter = 1
                message = name? `Bienvenido ${name}!!!`: `Te damos la bienvenida`
            }

            return { status: "OK", counter: req.session.counter, message: message }

        } catch (error) {
            console.log(error)
        }
    }

    async olvidar(req, res) {
        try {
            const { name } = req.query
            let message = `Hasta luego ${name? name + '.': '.'}`

            if (req.session) {
                req.session.destroy(error => {
                    if (!error) {
                        //res.json({ status: "Logout OK" })
                        console.log(`{ status: "Logout OK" }`)

                    } else {
                        //res.json({ status: "Logout Error", body: error })
                        console.log(`{ status: "Logout Error", body: error }`)
                    }
                })
            }

            return (req.session ? { status: "Logout Error" } : { status: "Logout OK", message: message })

        } catch (error) {
            console.log(error)
        }
    }

    async login(req) {
        try {
            const { user, password } = req.query
            let message = `Login Failed`
            let loginStatus = false

            if (user == 'pepe' && password == 'pepepass') {
                let loginStatus = true
                message = `Bienvenido Pepe!!!`
                req.session.user = user
                req.session.admin = true
            }

            return (loginStatus? { status: "OK", message: message } : { status: "Error", message: message } )

        } catch (error) {
            console.log(error)
        }
    }

}

export let practica3Service = new Practica3()