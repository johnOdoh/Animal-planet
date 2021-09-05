const express = require('express')
const router = express.Router()

const animalController = require('../controllers/animal')
const validator = require('../middlewares/validation')
const util = require('../middlewares/utiltiy')

router.get('/animal/create', util.isAuth, animalController.getAddAnimal)
router.get('/animal', util.isAuth, animalController.getMyAnimals)
router.get('/animal/:id/edit', util.isAuth, animalController.getEditAnimal)
router.post('/animal', util.isAuth, validator.addAnimal, animalController.uploadAnimal)
router.post('/animal/update/:id', util.isAuth, validator.addAnimal, animalController.postEditAnimal)
router.post('/animal/delete/:id', util.isAuth, animalController.removeAnimal)

module.exports = router