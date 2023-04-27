const router = require('express').Router();
const MovieController = require('../controllers/movieController');
const { authorization, updateStatusAuthorization } = require('../middleware/authorization');

router.post('/', MovieController.createMovie)
router.get('/', MovieController.getAllMovies)
router.get('/:id', MovieController.getMovieById)
router.delete('/:id', authorization, MovieController.deleteMovieById)

router.patch('/:id', updateStatusAuthorization, MovieController.patchMovieStatusById)
router.put('/:id', authorization, MovieController.updateMovieById)

module.exports = router;