const router = require('express').Router();
const CustomerController = require('../controllers/customerController');
const {authentication, customerAuthentication} = require('../middleware/authentication')

router.post('/register', CustomerController.registerCustomer)
router.post('/login', CustomerController.loginCustomer)
router.post('/login-with-google', CustomerController.googleLoginCustomer)
router.get('/movies', CustomerController.getAllMoviesByCustomer)
router.get('/movies/:id', CustomerController.getMovieDetail)
router.get('/genres', CustomerController.getAllGenresByCustomer)
router.post('/favorites/:id', customerAuthentication, CustomerController.createCustomerFavorite)
router.get('/favorites', customerAuthentication, CustomerController.getAllCustomerFavorites)

module.exports = router