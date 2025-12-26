import { useState } from "react";
import axios from "axios";

const genresList = [
  "Action", "Adventure", "Comedy", "Crime", "Drama", "Fantasy",
  "Historical", "Horror", "Mystery", "Romance", "Sci-Fi", "Thriller", "Biography"
];

export default function AddMovieForm() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
    genre: [],
    director: "",
    cast: "",
    posterUrl: "",
    imdbId: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      const options = Array.from(e.target.selectedOptions, option => option.value);
      setMovie({ ...movie, genre: options });
    } else {
      setMovie({ ...movie, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/movies", movie, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMessage("Movie added successfully!");
      setMovie({
        title: "",
        description: "",
        rating: "",
        releaseDate: "",
        duration: "",
        genre: [],
        director: "",
        cast: "",
        posterUrl: "",
        imdbId: ""
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Error adding movie");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen my-16 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <div className="w-full max-w-3xl p-8 bg-black/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/20">
        <h2 className="text-4xl font-bold mb-6 text-center text-white tracking-wider">Add New Movie</h2>

        {message && <p className="mb-4 text-center text-red-500 font-semibold">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-white/80 mb-1 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={movie.title}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Movie Title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/80 mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={movie.description}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Movie Description"
            />
          </div>

          {/* Rating & Release Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 mb-1 font-medium">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                name="rating"
                value={movie.rating}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="8.5"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-1 font-medium">Release Date</label>
              <input
                type="date"
                name="releaseDate"
                value={movie.releaseDate}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Duration & Director */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 mb-1 font-medium">Duration (mins)</label>
              <input
                type="number"
                name="duration"
                value={movie.duration}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="120"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-1 font-medium">Director</label>
              <input
                type="text"
                name="director"
                value={movie.director}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Director Name"
              />
            </div>
          </div>

          {/* Cast */}
          <div>
            <label className="block text-white/80 mb-1 font-medium">Cast (comma separated)</label>
            <input
              type="text"
              name="cast"
              value={movie.cast}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Actor1, Actor2, Actor3"
            />
          </div>

          {/* Genres */}
          <div>
            <label className="block text-white/80 mb-1 font-medium">Genres</label>
            <select
              multiple
              name="genre"
              value={movie.genre}
              onChange={handleChange}
              required
              className="w-full h-36 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              {genresList.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>

          {/* Poster URL */}
          <div>
            <label className="block text-white/80 mb-1 font-medium">Poster URL</label>
            <input
              type="url"
              name="posterUrl"
              value={movie.posterUrl}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="https://image.url"
            />
          </div>

          {/* IMDb ID */}
          <div>
            <label className="block text-white/80 mb-1 font-medium">IMDb ID</label>
            <input
              type="text"
              name="imdbId"
              value={movie.imdbId}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="tt1234567"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-all duration-300"
          >
            {loading ? "Adding..." : "Add Movie"}
          </button>
        </form>
      </div>
    </div>
  );
}
