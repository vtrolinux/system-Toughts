const router = require('express').Router()
const ToughtController = require('../controllers/ToughtController')
const checkSession = require('../middleware/check-session')

router.get('/add', checkSession, ToughtController.createTought)
router.post('/add', checkSession, ToughtController.createToughtSave)

router.get('/', ToughtController.showToughts)
router.get('/dashboard',checkSession, ToughtController.dashboard)

module.exports = router