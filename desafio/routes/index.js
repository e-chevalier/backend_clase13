import { viewOneApi } from '../components/viewOne/index.js'
import { viewProductsFakerApi } from '../components/viewProductsFaker/index.js'
import { loginApi } from '../components/login/index.js'
import { logoutApi } from '../components/logout/index.js'

export const serverRoutes = ( app ) => {
    viewOneApi(app)
    viewProductsFakerApi(app)
    loginApi(app)
    logoutApi(app)

    app.get("/", (req, res, next) => {
        //res.send("Todo ok")
        res.redirect('/api/login')
    })
    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })
}