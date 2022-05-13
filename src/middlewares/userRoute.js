const guest = (req, res, next) => {

    if (!res.locals.isAuthenticated) {
        res.redirect('/usuarios/ingresar');
    }

    next();
}

module.exports = guest;