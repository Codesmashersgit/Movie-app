// const express = require('express');
// const {
//   getMovies,
//   getSortedMovies,
//   searchMovies,
//   getMovie,
//   createMovie,
//   createMovieQueue,
//   bulkImportMovies,
//   getQueueStatus,
//   updateMovie,
//   deleteMovie,
//   getMovieStats
// } = require('../controllers/movieController');
// const { protect, authorize } = require('../middleware/auth');


// const router = express.Router();

// router.get('/', getMovies);
// router.get('/sorted', getSortedMovies);
// router.get('/search', searchMovies);
// router.get('/stats', getMovieStats);
// router.get('/:id', getMovie);

// router.post('/', protect, authorize('admin'), createMovie);
// router.post('/queue', protect, authorize('admin'), createMovieQueue);
// router.post('/bulk', protect, authorize('admin'), bulkImportMovies);
// router.get('/queue/status/:jobId', protect, getQueueStatus);
// router.put('/:id', protect, authorize('admin'), updateMovie);
// router.delete('/:id', protect, authorize('admin'), deleteMovie);

// module.exports = router;



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
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public Routes
router.get('/', getMovies);  // Get all movies
router.get('/sorted', getSortedMovies);  // Get sorted movies (by rating, etc.)
router.get('/search', searchMovies);  // Search for movies
router.get('/stats', getMovieStats);  // Get movie stats
router.get('/:id', getMovie);  // Get a single movie by ID

// Protected Routes (Admin Only)
router.post('/', protect, authorize('admin'), createMovie);  // Create a movie
router.post('/queue', protect, authorize('admin'), createMovieQueue);  // Add movie to processing queue
router.post('/bulk', protect, authorize('admin'), bulkImportMovies);  // Bulk import movies
router.get('/queue/status/:jobId', protect, getQueueStatus);  // Get processing status
router.put('/:id', protect, authorize('admin'), updateMovie);  // Update a movie
router.delete('/:id', protect, authorize('admin'), deleteMovie);  // Delete a movie

module.exports = router;
