import { practica1Service } from '../services/practica1Service.js'

class Practica1 {
    async getCookies(req, res, next) {
        try {
            let response = await practica1Service.getCookies(req)
            res.json(response)

        } catch (error) {
            console.log(error);
        }
    }

    async createCookie(req, res, next) {
        try {
            let response = await practica1Service.createCookie(req, res)
            res.json(response)

        } catch (error) {
            console.log(error);
        }
    }

    async deleteCookie(req, res, next) {
        try {
            let response = await practica1Service.deleteCookie(req, res)
            res.json(response)

        } catch (error) {
            console.log(error);
        }
    }

}

export let practica1Controller = new Practica1()
