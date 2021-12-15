const router = require('express').Router()
const ToughtController = require('../controllers/ToughtController')
const checkSession = require('../middleware/check-session')

router.get('/add', checkSession, ToughtController.createTought)
router.post('/add', checkSession, ToughtController.createToughtSave)

router.get('/edit/:id', checkSession, ToughtController.updateTought)
router.post('/edit', checkSession, ToughtController.updateToughtSave)

router.post('/remove',checkSession, ToughtController.removeTought)

router.get('/', ToughtController.showToughts)
router.get('/dashboard',checkSession, ToughtController.dashboard)

module.exports = router