const express = require('express')

const publicController = require('../controllers/public')

const router = express.Router()

router.get('/', publicController.getIndex)
router.get('/games', publicController.getGames)
router.get('/quiz', publicController.getQuizGame)
router.get('/animal', publicController.getAllAnimals)
router.get('/animal/:id', publicController.getAnimal)

module.exports = router