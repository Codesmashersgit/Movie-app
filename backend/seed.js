
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Movie = require("./models/Movie");
const User = require("./models/User");

// Load env
dotenv.config();

// MongoDB connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI); // latest driver options not needed
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

// Sample movies (same as tumhare, unchanged)
const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    releaseDate: "1994-09-23",
    duration: 142,
    genre: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
    imdbId: "tt0111161"
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    releaseDate: "1972-03-24",
    duration: 175,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0068646"
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    releaseDate: "2008-07-18",
    duration: 152,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    imdbId: "tt0468569"
  },
  {
    title: "The Godfather Part II",
    description: "The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.",
    rating: 9.0,
    releaseDate: "1974-12-20",
    duration: 202,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    cast: ["Al Pacino", "Robert De Niro", "Robert Duvall"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0071562"
  },
  {
    title: "12 Angry Men",
    description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.",
    rating: 9.0,
    releaseDate: "1957-04-10",
    duration: 96,
    genre: ["Crime", "Drama"],
    director: "Sidney Lumet",
    cast: ["Henry Fonda", "Lee J. Cobb", "Martin Balsam"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg",
    imdbId: "tt0050083"
  },
  {
    title: "Schindler's List",
    description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    rating: 8.9,
    releaseDate: "1993-12-15",
    duration: 195,
    genre: ["Biography", "Drama", "History"],
    director: "Steven Spielberg",
    cast: ["Liam Neeson", "Ralph Fiennes", "Ben Kingsley"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    imdbId: "tt0108052"
  },
  {
    title: "The Lord of the Rings: The Return of the King",
    description: "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    rating: 8.9,
    releaseDate: "2003-12-17",
    duration: 201,
    genre: ["Action", "Adventure", "Drama"],
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Viggo Mortensen", "Ian McKellen"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0167260"
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    releaseDate: "1994-10-14",
    duration: 154,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0110912"
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    rating: 8.8,
    releaseDate: "1994-07-06",
    duration: 142,
    genre: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    imdbId: "tt0109830"
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    releaseDate: "2010-07-16",
    duration: 148,
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    imdbId: "tt1375666"
  },
  {
    title: "Fight Club",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    rating: 8.8,
    releaseDate: "1999-10-15",
    duration: 139,
    genre: ["Drama"],
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Meat Loaf"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
    imdbId: "tt0137523"
  },
  {
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    rating: 8.7,
    releaseDate: "1999-03-31",
    duration: 136,
    genre: ["Action", "Sci-Fi"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    imdbId: "tt0133093"
  },
  {
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    rating: 8.7,
    releaseDate: "1990-09-19",
    duration: 146,
    genre: ["Biography", "Crime", "Drama"],
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0099685"
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    rating: 8.6,
    releaseDate: "2014-11-07",
    duration: 169,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    imdbId: "tt0816692"
  },
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    rating: 8.6,
    releaseDate: "2019-05-30",
    duration: 132,
    genre: ["Drama", "Thriller"],
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg",
    imdbId: "tt6751668"
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    description: "After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda.",
    rating: 8.7,
    releaseDate: "1980-05-21",
    duration: 124,
    genre: ["Action", "Adventure", "Fantasy"],
    director: "Irvin Kershner",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    imdbId: "tt0080684"
  },
  {
    title: "The Silence of the Lambs",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    rating: 8.6,
    releaseDate: "1991-02-14",
    duration: 118,
    genre: ["Crime", "Drama", "Thriller"],
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Lawrence A. Bonney"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    imdbId: "tt0102926"
  },
  {
    title: "Saving Private Ryan",
    description: "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    rating: 8.6,
    releaseDate: "1998-07-24",
    duration: 169,
    genre: ["Drama", "War"],
    director: "Steven Spielberg",
    cast: ["Tom Hanks", "Matt Damon", "Tom Sizemore"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_.jpg",
    imdbId: "tt0120815"
  },
  {
    title: "The Green Mile",
    description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    rating: 8.6,
    releaseDate: "1999-12-10",
    duration: 189,
    genre: ["Crime", "Drama", "Fantasy"],
    director: "Frank Darabont",
    cast: ["Tom Hanks", "Michael Clarke Duncan", "David Morse"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTUxMzQyNjA5MF5BMl5BanBnXkFtZTYwOTU2NTY3._V1_.jpg",
    imdbId: "tt0120689"
  },
  {
    title: "Seven Samurai",
    description: "A poor village under attack by bandits recruits seven unemployed samurai to help them defend themselves.",
    rating: 8.6,
    releaseDate: "1954-04-26",
    duration: 207,
    genre: ["Action", "Adventure", "Drama"],
    director: "Akira Kurosawa",
    cast: ["Toshirô Mifune", "Takashi Shimura", "Keiko Tsushima"],
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOWQ4YTgzY2YtMjFiZS00NzMxLThlNDYtMjBlZDE3NjFhZTk5XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_.jpg",
    imdbId: "tt0047478"
  }
];

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting ADMIN database seeding...\n");

    // Admin Create
    let adminUser = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminUser) {
      adminUser = await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin",
      });
      console.log("✅ Admin created successfully");
    } else {
      console.log("ℹ️ Admin already exists");
    }

    console.log(`👤 Admin Name  : ${adminUser.name}`);
    console.log(`📧 Admin Email : ${adminUser.email}`);
    console.log(`🔐 Role        : ${adminUser.role}\n`);

    // Add Movies
    console.log("🎬 Seeding movies...\n");
    let added = 0;
    let skipped = 0;

    for (const movie of sampleMovies) {
      const exists = await Movie.findOne({ imdbId: movie.imdbId });
      if (!exists) {
        await Movie.create({ ...movie, addedBy: adminUser._id });
        added++;
        console.log(`✓ Added: ${movie.title}`);
      } else {
        skipped++;
        console.log(`⊘ Skipped: ${movie.title}`);
      }
    }

    // Summary
    console.log("\n===============================");
    console.log("✅ ADMIN SEEDING COMPLETED");
    console.log("===============================");
    console.log(`🎥 Movies Added   : ${added}`);
    console.log(`⏭️ Movies Skipped : ${skipped}`);
    console.log(`📊 Total Movies   : ${await Movie.countDocuments()}`);
    console.log(`👤 Total Users    : ${await User.countDocuments()}`);
    console.log("===============================\n");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seeder Error:", err);
    process.exit(1);
  }
};

// ===============================
// 4️⃣ Run Seeder
// ===============================
(async () => {
  console.log("\n🚀 Movie App – Admin Seeder\n");
  await connectDB();
  await seedDatabase();
})();