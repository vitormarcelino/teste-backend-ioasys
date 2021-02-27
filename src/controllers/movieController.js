const { Movie } = require('../models')
const { Op } = require("sequelize");

class MovieController {

    async index(req, res) {
        const movies = await Movie.findAll({ attributes: ['title', 'director', 'genre', 'actors']})
        return res.send(movies)
    }

    async store(req, res) {
        const data = await MovieController.getReqData(req)
        const movie = await Movie.create(data)
        return res.send({ movie })
    }

    async show(req, res) {
        const movie = await Movie.findByPk(req.params.id)
        if(!movie) {
            return res.status(404).send({error: "Not Found"})
        }
        return res.send(movie)
    }

    async update(req, res) {
        const data = await MovieController.getReqData(req)
        let movie = await Movie.findByPk(req.params.id)
        if(!movie) {
            return res.status(404).send({error: "Not Found"})
        }
        await movie.update(data)
        movie.updatedAt = undefined
        return res.send(movie)
    }

    async destroy(req, res) {
        const movie = await Movie.findByPk(req.params.id)
        if(!movie) {
            return res.status(404).send({error: "Not Found"})
        }
        movie.destroy()
        return res.status(204).send()
    }

    static async getReqData(req) {
        let { title, synopsis, director, genre, actors } = req.body
        return { title, synopsis, director, genre, actors }
    }

}

export default MovieController