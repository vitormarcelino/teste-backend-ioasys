const { Admin, User } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class AuthController {

    async authAdmin(req, res) {
        const { username, password } = req.body
        const admin = await Admin.findOne({ where: { username }, attributes: ['id', 'username', 'email', 'password'] })

        if(!admin) {
            return res.status(400).send({ error: 'Admin not Found'})
        }

        if(!await bcrypt.compare(password, admin.password)) {
            return res.status(400).send({ error: 'Invalid Password'})
        }

        admin.password = undefined
        const token = jwt.sign({ id: admin.id, model: 'admin' }, process.env.APP_KEY, { expiresIn: process.env.AUTH_EXPIRATION })

        res.send({ admin, token })
    }

    async authUser(req, res) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email }, attributes: ['id', 'name', 'email', 'password', 'birthday'] })

        if(!user) {
            return res.status(400).send({ error: 'User not Found'})
        }

        if(!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid Password'})
        }

        user.password = undefined
        const token = jwt.sign({ id: user.id, model: 'user' }, process.env.APP_KEY, { expiresIn: process.env.AUTH_EXPIRATION })

        res.send({ user, token })
    }

}

export default AuthController