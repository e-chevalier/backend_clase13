const auth = (req, res, next) => {

    if( req.isAuthenticated()) {
        return next()
    } else {
        return res.redirect('/api/failure?status_code=401');
        //res.status(401).redirect('/api/login')
    }

}

export {auth}