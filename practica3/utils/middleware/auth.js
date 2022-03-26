const auth = (req, res, next) => {

    if( req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/auth/facebook')
    }

}

export {auth}