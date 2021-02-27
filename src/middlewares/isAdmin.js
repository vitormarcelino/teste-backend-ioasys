module.exports = (req, res, next) => {
    if(req.authenticatedModel === 'admin') {
        return next()
    }
    return res.status(401).send({ error: "Unauthorized"})
}