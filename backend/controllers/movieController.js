const Movie = require('../models/Movie');
const { addMovieToQueue, bulkImportToQueue, getJobStatus } = require('../utils/queue');

exports.getMovies = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Movie.countDocuments();
    const movies = await Movie.find()
      .skip(startIndex)
      .limit(limit)
      .select('-__v')
      .lean();

    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    };

    if (page < pagination.pages) {
      pagination.next = page + 1;
    }
    if (page > 1) {
      pagination.prev = page - 1;
    }

    res.status(200).json({
      success: true,
      count: movies.length,
      pagination,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

exports.getSortedMovies = async (req, res, next) => {
  try {
    const { sortBy = 'rating', order = 'desc', page = 1, limit = 10 } = req.query;
    
    const validSortFields = ['title', 'rating', 'releaseDate', 'duration'];
    if (!validSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: `Invalid sort field. Use one of: ${validSortFields.join(', ')}`
      });
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = { [sortBy]: sortOrder };

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    const total = await Movie.countDocuments();
    const movies = await Movie.find()
      .sort(sortObj)
      .skip(startIndex)
      .limit(limitNum)
      .select('-__v')
      .lean();

    const pagination = {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    };

    res.status(200).json({
      success: true,
      count: movies.length,
      sortedBy: sortBy,
      order,
      pagination,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

exports.searchMovies = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search query'
      });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const startIndex = (pageNum - 1) * limitNum;

    const searchQuery = {
      $text: { $search: q }
    };

    const total = await Movie.countDocuments(searchQuery);
    const movies = await Movie.find(searchQuery)
      .select('-__v')
      .skip(startIndex)
      .limit(limitNum)
      .lean();

    const pagination = {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    };

    res.status(200).json({
      success: true,
      count: movies.length,
      query: q,
      pagination,
      data: movies
    });
  } catch (error) {
    next(error);
  }
};

exports.getMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).select('-__v');

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    req.body.addedBy = req.user.id;
    const movie = await Movie.create(req.body);

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
};

exports.createMovieQueue = async (req, res, next) => {
  try {
    const jobId = await addMovieToQueue(req.body, req.user.id);

    res.status(202).json({
      success: true,
      message: 'Movie added to processing queue',
      jobId,
      statusUrl: `/api/movies/queue/status/${jobId}`
    });
  } catch (error) {
    next(error);
  }
};

exports.bulkImportMovies = async (req, res, next) => {
  try {
    const { movies } = req.body;

    if (!Array.isArray(movies) || movies.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of movies'
      });
    }

    const jobId = await bulkImportToQueue(movies, req.user.id);

    res.status(202).json({
      success: true,
      message: `${movies.length} movies added to processing queue`,
      jobId,
      statusUrl: `/api/movies/queue/status/${jobId}`
    });
  } catch (error) {
    next(error);
  }
};

exports.getQueueStatus = async (req, res, next) => {
  try {
    const status = await getJobStatus(req.params.jobId);

    res.status(200).json({
      success: true,
      data: status
    });
  } catch (error) {
    next(error);
  }
};

exports.updateMovie = async (req, res, next) => {
  try {
    let movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: 'Movie not found'
      });
    }

    await movie.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Movie deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

exports.getMovieStats = async (req, res, next) => {
  try {
    const stats = await Movie.aggregate([
      {
        $group: {
          _id: null,
          totalMovies: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          avgDuration: { $avg: '$duration' },
          maxRating: { $max: '$rating' },
          minRating: { $min: '$rating' }
        }
      }
    ]);

    const genreStats = await Movie.aggregate([
      { $unwind: '$genre' },
      {
        $group: {
          _id: '$genre',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        overview: stats[0] || {},
        genreDistribution: genreStats
      }
    });
  } catch (error) {
    next(error);
  }
};