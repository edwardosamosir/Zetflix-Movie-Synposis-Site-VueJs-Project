const router = require('express').Router();
const MovieController = require('../controllers/movieController');

router.get('/', MovieController.getAllGenres)
router.post('/', MovieController.createGenre)
router.delete('/:id', MovieController.deleteGenrebyId)
router.put('/:id', MovieController.updateGenreById)

module.exports = router;