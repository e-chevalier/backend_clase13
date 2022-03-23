import cookieParser from "cookie-parser"

class Practica1 {

    async getCookies(req) {
        try {
            console.log("GET COOKIES")

            return { proceso: 'ok', cookies: req.cookies }

        } catch (error) {
            console.log(error);
        }
    }


    async createCookie(req, res) {
        try {

            console.log("CREATE COOKIE")

            let { cookieName, time } = req.body

            if (cookieName) {
                if (time) {
                    res.cookie(cookieName, 'express', { maxAge: Number(time) * 1000 })
                } else {
                    res.cookie(cookieName, 'express')
                }
            }

            return cookieName ? { proceso: 'ok' } : {error: 'Falta nombre o valor'}

        } catch (error) {
            console.log(error);
        }
    }

    async deleteCookie(req, res) {
        try {
            console.log("DELETE COOKIE")

            let { cookieName }  = req.params

            if (cookieName) {
                res.clearCookie(cookieName)
            }

            return cookieName ? { proceso: 'ok' } : {error: 'Nombre no encontrado.'}

        } catch (error) {
            console.log(error);
        }
    }

}

export let practica1Service = new Practica1()