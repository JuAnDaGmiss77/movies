const {mongoose} = require('../config/db')

const {Schema} = mongoose

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    birthday:Date,
    city:String,
    email:String,
    password:String,
    role: {
        type:Number,
        default:0
    }
})

const UserModel = mongoose.model("users",userSchema)

module.exports = UserModel