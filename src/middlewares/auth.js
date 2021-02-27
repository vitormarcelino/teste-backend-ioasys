const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if(/authenticate$/i.test(req.path)) {
        return next()
    }

    const bearerHeader = req.headers.authorization
    if(!bearerHeader) {
        return res.status(401).send({ error: 'No authorization header found' })
    }

    if(!/^Bearer .*/i.test(bearerHeader)) {
        return res.status(401).send({ error: 'Invalid authorization header (malformated)'})
    }

    const token = bearerHeader.replace('Bearer ', '')
    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: 'Token Invalid' })
        }
        req.authenticatedId = decoded.id
        req.authenticatedModel = decoded.model
        return next()
    })

}