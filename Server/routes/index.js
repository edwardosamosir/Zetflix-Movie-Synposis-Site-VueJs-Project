const router = require('express').Router()
const moviesRouter =  require('./movies')
const genresRouter = require('./genres')
const historiesRouter = require('./histories')
const usersRouter = require('./users')
const customersRouter = require('./customers')
const {authentication} = require('../middleware/authentication')
const errorHandler = require('../middleware/errorHandler')
 
router.use('/users', usersRouter)
router.use('/customers', customersRouter)
// router.use(authentication)
router.use('/movies', authentication, moviesRouter)
router.use('/genres', authentication, genresRouter)
router.use("/histories", historiesRouter);

router.use(errorHandler)

module.exports = router;