const { mongoose } = require("../config/db");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  rating: Number,
  imgURL : String,
  editor:{
    ref:"UserModel",
    type:Schema.Types.ObjectId
  }
});

const MovieModel = mongoose.model("movies", movieSchema);

module.exports = MovieModel;
