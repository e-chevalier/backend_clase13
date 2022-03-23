import { practica2Service } from '../services/practica2Service.js'

class Practica2 {
    async getPractica2(req, res, next) {
        try {
            let response = await practica2Service.getPractica2(req)
            res.send(`<H1> ${ response.message } </H1>`)

        } catch (error) {
            console.log(error)
        }

    }

    async olvidar(req, res, next) {
        try {

            let response = await practica2Service.olvidar(req, res)
            console.log(req.session)
            res.send(`<H1> ${ response.message } </H1>`)

        } catch (error) {
            console.log(error)
        }

    }

    async login(req, res, next) {
        try {
            let response = await practica2Service.login(req)
            res.send(`<H1> ${ response.message } </H1>`)

        } catch (error) {
            console.log(error)
        }

    }

}

export let practica2Controller = new Practica2()
