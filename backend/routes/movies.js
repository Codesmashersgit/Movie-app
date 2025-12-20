const express = require('express');
const {
  getMovies,
  getSortedMovies,
  searchMovies,
  getMovie,
  createMovie,
  createMovieQueue,
  bulkImportMovies,
  getQueueStatus,
  updateMovie,
  deleteMovie,
  getMovieStats
} = require('../controllers/movieController');

const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

router.get('/', getMovies);
router.get('/sorted', getSortedMovies);
router.get('/search', searchMovies);
router.get('/stats', getMovieStats);
router.get('/:id', getMovie);

router.post('/', protect, authorize('admin'), createMovie);
router.post('/queue', protect, authorize('admin'), createMovieQueue);
router.post('/bulk', protect, authorize('admin'), bulkImportMovies);
router.get('/queue/status/:jobId', protect, getQueueStatus);
router.put('/:id', protect, authorize('admin'), updateMovie);
router.delete('/:id', protect, authorize('admin'), deleteMovie);

module.exports = router;