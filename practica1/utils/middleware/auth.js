const auth = (req, res, next) => {

    if( req.session.username ) {
        return next()
    } else {
        return res.status(401).redirect('/api/login')
    }

}

export {auth}