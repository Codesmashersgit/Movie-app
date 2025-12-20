const Bull = require('bull');
const Movie = require('../models/Movie');

const movieQueue = new Bull('movie-operations', process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    },
    removeOnComplete: true,
    removeOnFail: false
  }
});

movieQueue.process('addMovie', async (job) => {
  const { movieData, userId } = job.data;
  
  try {
    console.log(`Processing movie addition: ${movieData.title}`);
    
    const movie = await Movie.create({
      ...movieData,
      addedBy: userId
    });
    
    console.log(`Movie added successfully: ${movie._id}`);
    return { success: true, movieId: movie._id };
  } catch (error) {
    console.error(`Error adding movie: ${error.message}`);
    throw error;
  }
});

movieQueue.process('bulkImport', async (job) => {
  const { movies, userId } = job.data;
  
  try {
    console.log(`Processing bulk import of ${movies.length} movies`);
    
    const results = [];
    for (const movieData of movies) {
      try {
        const movie = await Movie.create({
          ...movieData,
          addedBy: userId
        });
        results.push({ success: true, movieId: movie._id, title: movie.title });
      } catch (error) {
        results.push({ success: false, title: movieData.title, error: error.message });
      }
    }
    
    console.log(`Bulk import completed: ${results.filter(r => r.success).length}/${movies.length} successful`);
    return results;
  } catch (error) {
    console.error(`Error in bulk import: ${error.message}`);
    throw error;
  }
});

movieQueue.on('completed', (job, result) => {
  console.log(`Job ${job.id} completed with result:`, result);
});

movieQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed with error:`, err.message);
});

movieQueue.on('stalled', (job) => {
  console.warn(`Job ${job.id} has stalled`);
});

exports.addMovieToQueue = async (movieData, userId) => {
  const job = await movieQueue.add('addMovie', { movieData, userId }, {
    priority: 1
  });
  return job.id;
};

exports.bulkImportToQueue = async (movies, userId) => {
  const job = await movieQueue.add('bulkImport', { movies, userId }, {
    priority: 2,
    timeout: 300000
  });
  return job.id;
};

exports.getJobStatus = async (jobId) => {
  const job = await movieQueue.getJob(jobId);
  if (!job) {
    return { status: 'not_found' };
  }
  
  const state = await job.getState();
  const progress = job.progress();
  const result = job.returnvalue;
  
  return {
    status: state,
    progress,
    result,
    failedReason: job.failedReason
  };
};

exports.cleanQueue = async () => {
  await movieQueue.clean(24 * 3600 * 1000, 'completed');
  await movieQueue.clean(7 * 24 * 3600 * 1000, 'failed');
};

module.exports = movieQueue;