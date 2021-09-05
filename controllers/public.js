const { Op } = require('sequelize')
const { Animal } = require('../models/models')

exports.getIndex = (req, res, next) => {
    res.render('public/index', { title: 'Home' })
}

exports.getGames = (req, res, next) => {
    res.render('public/games', { title: 'Games' })
}

exports.getQuizGame = (req, res, next) => {
    res.render('public/quiz', { title: 'Quiz Game' })
}

exports.getAllAnimals = async(req, res, next) => {
    try {
        let filter = {}
        let search = 'All Animals'
        if (req.query.search) {
            search = 'Search result for "' + req.query.search + '"'
            const query = '%' + req.query.search + '%'
            filter = {
                where: {
                    [Op.or]: [{
                            name: {
                                [Op.like]: query
                            }
                        },
                        {
                            class: {
                                [Op.like]: query
                            }
                        },
                        {
                            description: {
                                [Op.like]: query
                            }
                        },
                        {
                            botanical_name: {
                                [Op.like]: query
                            }
                        },
                        {
                            habitat: {
                                [Op.like]: query
                            }
                        }
                    ]
                }
            }
        }
        if (req.query.class) {
            filter = { where: { class: req.query.class } }
            if (req.query.class == 'Fish') search = req.query.class + 'es'
            else search = req.query.class + 's'
        }
        if (req.query.endangered) {
            filter = { where: { endangered: 'Yes' } }
        }
        const animals = await Animal.findAndCountAll({
            filter,
            order: [
                ['id', 'Desc']
            ]
        })
        res.render('public/animals', { search: search, animals: animals.rows, count: animals.count, title: 'Animals' })
    } catch (error) {
        return next(new Error(error))
    }
}

exports.getAnimal = async(req, res, next) => {
    try {
        const animal = await Animal.findByPk(req.params.id)
        if (!animal) return redirect('/404')
        const animals = await Animal.findAll({
            where: {
                [Op.not]: [{ id: animal.id }],
                [Op.or]: [{ habitat: animal.habitat }, { class: animal.class }]
            },
            limit: 3
        })
        res.render('public/animal-single', { title: animal.name, animal: animal, animals: animals })
    } catch (error) {
        return next(new Error(error))
    }
}