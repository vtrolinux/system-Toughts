const router = require('express').Router()
const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login)
router.post('/login',AuthController.loginPost)

router.post('/register',AuthController.Register)

module.exports = router