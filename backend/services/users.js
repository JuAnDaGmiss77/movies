const UserModel = require("../models/user")
const bcrypt = require("bcrypt")

class Users{
    
    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        return hash

    }

    async get(id){
        const user = await UserModel.findById(id)
        return user
    }

    async getByEmail(email){
        const user = await UserModel.findOne({email:email})
        return user
        
    }

    async getAll(){
        // find devuelve varios elementos
        const users = await UserModel.find()
        return users
    }

    async create(data){
        if(await this.getByEmail(data.email)){
            return {success:false,message:"Usuario ya registrado"}
        } else{
            data.password = await this.hashPassword(data.password)
            const user = await UserModel.create(data)
            return user
        }
        
    }

    async update(id,data){
        const user = await UserModel.findByIdAndUpdate(id,data,{new:true})
        return user
    }

    async delete(id){
        const user = await UserModel.findByIdAndDelete(id)
        return user
    }
}

module.exports = Users