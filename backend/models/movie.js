const { mongoose } = require("../config/db");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  rating: Number,
});

const MovieModel = mongoose.model("movies", movieSchema);

module.exports = MovieModel;
