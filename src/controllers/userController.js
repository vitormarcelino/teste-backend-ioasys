const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");

class UserController {

    async index(req, res) {
        const users = await User.findAll()
        return res.send(users)
    }

    async store(req, res) {
        const data = await UserController.getReqData(req)
        const exists = await User.count({ where: { email: { [Op.eq]: data.email } }})
        if(exists) {
            return res.status(409).send({ error: 'User already exists'})
        }
        let user = await User.create(data)
        user.password = undefined
        return res.send({ user })
    }

    async show(req, res) {
        const user = await User.findByPk(req.params.id)
        if(!user) {
            return res.status(404).send({error: "Not Found"})
        }
        return res.send(user)
    }

    async update(req, res) {
        const data = await UserController.getReqData(req)
        let user = await User.findByPk(req.params.id)
        await user.update(data)
        user.password = undefined
        user.updatedAt = undefined
        return res.send(user)
    }

    async destroy(req, res) {
        const user = await User.findByPk(req.params.id)
        if(!user) {
            return res.status(404).send({error: "Not Found"})
        }
        user.destroy()
        return res.status(204).send()
    }

    static async getReqData(req) {
        let { name, email, password, birthday } = req.body
        password = bcrypt.hashSync(password)
        return { name, email, password, birthday }
    }

}

export default UserController