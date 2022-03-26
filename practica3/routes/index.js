import { registrationApi } from "../components/registration/index.js"
import { loginApi } from '../components/login/index.js'
import { logoutApi } from '../components/logout/index.js'
import { mainApi } from "../components/main/index.js"
import { authFacebookApi } from "../components/authFacebook/index.js"
import { failureApi } from "../components/failure/index.js"

export const serverRoutes = ( app, passport ) => {
    authFacebookApi(app, passport)
    registrationApi(app, passport)
    loginApi(app, passport)
    logoutApi(app)
    mainApi(app)
    failureApi(app)
 
    app.get("/", (req, res, next) => {
        //res.send('Todo OK!')
        res.redirect('/api/login')
    })
    /**
    * Undefined endpoint
    */
    app.all('*', (req, res, next) => {
        res.json({ error: -2, descripcion: `Ruta ${req.url} método ${req.method} no implementada.` })
    })
}