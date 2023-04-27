const router = require('express').Router()
const MovieController = require('../controllers/movieController')

router.get('/', MovieController.getHistoryLogs)

module.exports = router