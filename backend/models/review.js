const { mongoose } = require("../config/db")

const { Schema } = mongoose

const reviewSchema = new Schema({
    review:String,
    user:{
        ref:"UserModel",
        type:Schema.Types.ObjectId
    }
},{
    timestamps:true
})

const ReviewModel = mongoose.model("reviews", reviewSchema)
module.exports = ReviewModel