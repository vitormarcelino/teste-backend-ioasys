const { Movie } = require('../models')
const { Op } = require("sequelize");

class MovieController {

    async index(req, res) {
        let config = { attributes: ['title', 'director', 'genre', 'actors']}
        if(Object.keys(req.query).length > 0) {
            config.where = {}
            Object.keys(req.query).forEach(filter => {
                if(config.attributes.includes(filter)) {
                    let operator = (filter == 'actors') ? Op.substring : Op.eq
                    config.where[filter] = { [operator]: req.query[filter] }
                }
            })
        }
        const movies = await Movie.findAll(config)
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
        let returnObj = movie.toJSON()
        returnObj.averageVotes = await movie.getAverageVotes()
        return res.send(returnObj)
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

    async vote(req, res) {
        const movie = await Movie.findByPk(req.params.id)
        if(!movie) {
            return res.status(404).send({error: "Not Found"})
        }
        const { note } = req.body
        let error = movie.computeVote(note, req.authenticatedId)
        if(error) {
            return res.status(400).send({ error })
        }
        return res.status(204).send()
    }

    static async getReqData(req) {
        let { title, synopsis, director, genre, actors } = req.body
        return { title, synopsis, director, genre, actors }
    }

}

export default MovieController