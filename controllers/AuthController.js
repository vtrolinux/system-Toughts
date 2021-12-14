const Tought = require('../models/Tought')
const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static async login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        res.render('auth/login')
    }
    static async register(req,res){
        res.render('auth/register')
    }
    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body
    
        // passwords match validation
        if (password != confirmpassword) {
          req.flash('message', 'As senhas não conferem, tente novamente!')
          res.render('auth/register')
    
          return
        }
    
        // email validation
        const checkIfUserExists = await User.findOne({ where: { email: email } })
    
        if (checkIfUserExists) {
            req.flash('message', 'O e-mail já está em uso!')
            res.render('auth/register')
    
            return
        }
    
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
    
        const user = {
            name,
            email,
            password: hashedPassword,
        }
    
        try {

            const createdUser = await User.create(user)
            // inicializa sessao
            req.session.userid = createdUser.id

            req.flash('message', 'Cadastro realizado com sucesso!')
     
            req.session.save(() => {
                res.redirect('/')// garante que a sessao seja salva antes de redirecionar para a /
            })
           
        } catch (error) {
            console.log(error)
        }
    }
}