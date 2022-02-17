const Users = require("./users")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")
const bcrypt = require("bcrypt")

class Auth{

    constructor(){
        this.users = new Users()
    }

    async hashPassword(password){
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password,salt)

        return hash

    }

    //Hacer decrypting
    // Reto: Implementar ese metodo
    //bcrypt.compare(password,user.password)

    async login(email,password){
        const user = await this.users.getByEmail(email)
        //si se envia un correo falso crashea el server, para eso sirve la validacion
        if(!user){
            return {success:false,message:"Las credenciales no coinciden"}
        }
        const correctPassword = await bcrypt.compare(password,user.password)
        if(user && correctPassword){
            // user.password = undefined
            // user.__v = undefined
            // jwt.sign(user,jwt_secret,{expiresIn:"1d"},(error,token)=>{
            //     return {success:true,user,token}
            // })
            const dataUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role?user.role:0,
            }
            const token = jwt.sign(dataUser,jwt_secret,{expiresIn:"1d"})
            return {success:true,dataUser,token}
        } else {
            return {success:false,message:"Las credenciales no coinciden"}
        }

        
    }

    async signup(userData){
        if(await this.users.getByEmail(userData.email)){
            return {success:false,message:"Usuario ya registrado"}
        }else{
            userData.role = 0
            userData.password = await this.hashPassword(userData.password)
            const user = await this.users.create(userData)
            const dataUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: 0,
            }
            const token = jwt.sign(dataUser,jwt_secret,{expiresIn:"1d"})
            return {succes:true,dataUser,token}
        }
        
    }
}

module.exports = Auth