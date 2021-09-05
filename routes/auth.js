const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')
const validator = require('../middlewares/validation')
const util = require('../middlewares/utiltiy')

router.get('/login', util.notAuth, authController.getLogin)
router.get('/register', util.notAuth, authController.getRegister)
router.post('/register', util.notAuth, validator.registerVal, authController.register)
router.post('/login', util.notAuth, authController.login)
router.post('/logout', util.isAuth, authController.logout)

module.exports = router