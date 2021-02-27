const { Admin } = require('../models')
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
        console.log(process.env.AUTH_EXPIRATION)

        admin.password = undefined
        const token = jwt.sign({ id: admin.id }, process.env.APP_KEY, { expiresIn: process.env.AUTH_EXPIRATION })

        res.send({ admin, token })
    }

}

export default AuthController