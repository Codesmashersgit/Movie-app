const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a movie title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [0, 'Rating must be at least 0'],
    max: [10, 'Rating cannot be more than 10']
  },
  releaseDate: {
    type: Date,
    required: [true, 'Please add a release date']
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes'],
    min: [1, 'Duration must be at least 1 minute']
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Please add at least one genre'
    }
  },
  director: {
    type: String,
    required: [true, 'Please add a director'],
    trim: true,
    maxlength: [100, 'Director name cannot be more than 100 characters']
  },
  cast: {
    type: [String],
    required: [true, 'Please add at least one cast member'],
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'Please add at least one cast member'
    }
  },
  posterUrl: {
    type: String,
    trim: true,
    match: [
      /^https?:\/\/.+/,
      'Please add a valid URL'
    ]
  },
  imdbId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true,
    match: [
      /^tt\d{7,8}$/,
      'Please add a valid IMDb ID (e.g., tt0111161)'
    ]
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

MovieSchema.index({ title: 1 });
MovieSchema.index({ rating: -1 });
MovieSchema.index({ releaseDate: -1 });
MovieSchema.index({ duration: 1 });
MovieSchema.index({ imdbId: 1 });

MovieSchema.index({ 
  title: 'text', 
  description: 'text',
  director: 'text',
  cast: 'text'
});

module.exports = mongoose.model('Movie', MovieSchema);