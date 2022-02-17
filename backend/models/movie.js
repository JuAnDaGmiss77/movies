const { mongoose } = require("../config/db");

const { Schema } = mongoose;

const movieSchema = new Schema({
  title: String,
  description: String,
  date: String,
  rating: Number,
  imgURL : String,
  creator:{
    ref:"UserModel",
    type:Schema.Types.ObjectId
  }
});

const MovieModel = mongoose.model("movies", movieSchema);

module.exports = MovieModel;
