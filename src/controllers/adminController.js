const { Admin } = require('../models')
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");

class AdminController {

    async index(req, res) {
        const admins = await Admin.findAll()
        return res.send(admins)
    }

    async store(req, res) {
        const data = await AdminController.getReqData(req)
        const exists = await Admin.count({ where: { username: { [Op.eq]: data.username }, email: { [Op.eq]: data.email } }})
        if(exists) {
            return res.status(409).send({ error: 'Admin already exists'})
        }
        Admin.create(data)
        return res.send({ok: true})
    }

    async show(req, res) {
        const admin = await Admin.findByPk(req.params.id)
        if(!admin) {
            return res.status(404).send({error: "Not Found"})
        }
        return res.send(admin)
    }

    async update(req, res) {
        const data = await AdminController.getReqData(req)
        let admin = await Admin.findByPk(req.params.id)
        await admin.update(data)
        admin.password = undefined
        admin.updatedAt = undefined
        return res.send(admin)
    }

    async destroy(req, res) {
        const admin = await Admin.findByPk(req.params.id)
        if(!admin) {
            return res.status(404).send({error: "Not Found"})
        }
        admin.destroy()
        return res.status(204).send()
    }

    static async getReqData(req) {
        let { username, email, password } = req.body
        password = bcrypt.hashSync(password)
        return { username, email, password }
    }

}

export default AdminController