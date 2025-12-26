const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  releaseDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  genre: {
    type: [String],
    required: true
  },
  director: {
    type: String,
    required: true,
    trim: true
  },
  cast: {
    type: [String],
    required: true
  },
  posterUrl: {
    type: String,
    trim: true
  },
  imdbId: {
    type: String,
    trim: true,
    unique: true,
    sparse: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// indexes
MovieSchema.index({ title: 1 });
MovieSchema.index({ rating: -1 });
MovieSchema.index({ releaseDate: -1 });
MovieSchema.index({ duration: 1 });

MovieSchema.index({
  title: 'text',
  description: 'text',
  director: 'text',
  cast: 'text'
});

module.exports = mongoose.model('Movie', MovieSchema);
