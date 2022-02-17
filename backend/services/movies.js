const MovieModel = require("../models/movie")
const Users = require("../services/users")
class Movies{
    constructor(){
        this.users = new Users()
    }

    async get(id){
        const movie = await MovieModel.findById(id)
        return movie
    }

    async getAll(){
        // find devuelve varios elementos
        const movies = await MovieModel.find()
        return movies
    }

    async create(data){
        //busco en el modelo del usuario que exista el correo para asi guardar el user_id
        const user = await this.users.getByEmail(data.email)
        if (user) {
            data.creator = user._id
            data.email = undefined
    
            const movie = await MovieModel.create(data)
            return movie
        } else {
            return {succes:false , message: "accion incorrecta"}
        }
    }

    async update(id,data){
        const movie = await MovieModel.findByIdAndUpdate(id,data,{new:true})
        return movie
    }

    async delete(id){
        const movie = await MovieModel.findByIdAndDelete(id)
        return movie
    }

    async getMovieForCreator(id){
        const movies = await MovieModel.find({creator:id})

        return movies   
    }
}

module.exports = Movies