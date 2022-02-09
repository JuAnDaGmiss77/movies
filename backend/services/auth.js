const Users = require("./users")
const jwt = require("jsonwebtoken")
const { jwt_secret } = require("../config")

class Auth{

    constructor(){
        this.users = new Users()
    }

    async login(email,password){
        const user = await this.users.getByEmail(email)
        if(user && user.password === password && password != ''){
            // user.password = undefined
            // user.__v = undefined
            // jwt.sign(user,jwt_secret,{expiresIn:"1d"},(error,token)=>{
            //     return {success:true,user,token}
            // })
            const dataUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            }
            const token = jwt.sign(dataUser,jwt_secret,{expiresIn:"1d"})
            return {success:true,dataUser,token}
        }

        return {success:false,message:"Las credenciales no coinciden"}
    }

    async signup(userData){
        try {
            if(await this.users.getByEmail(userData.email)){
                // return res.status(400).json({succes:false,message:"Usuario ya registrado"})
                return {succes:false,message:"Usuario ya registrado"}
            }else{
                const user = await this.users.create(userData)
                const dataUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                }
                const token = jwt.sign(dataUser,jwt_secret,{expiresIn:"1d"})
                // return res.status(200).json({succes:true,data,token})
                return {succes:true,dataUser,token}
            }
        } catch (error) {
            console.error(error)
        }
        
    }
}

module.exports = Auth