import { practica3Service } from '../services/practica3Service.js'

class Practica3 {
    async getPractica3(req, res, next) {
        try {
            let response = await practica3Service.getPractica3(req)
            res.send(`<H1> ${ response.message } </H1>`)

        } catch (error) {
            console.log(error)
        }

    }

    async olvidar(req, res, next) {
        try {

            let response = await practica3Service.olvidar(req, res)
            console.log(req.session)
            res.send(`<H1> ${ response.message } </H1>`)

        } catch (error) {
            console.log(error)
        }

    }

    async login(req, res, next) {
        try {
            let response = await practica3Service.login(req)
            res.send(`<H1> ${ response.message } </H1>`)

        } catch (error) {
            console.log(error)
        }

    }

}

export let practica3Controller = new Practica3()
