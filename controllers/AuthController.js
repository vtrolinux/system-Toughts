const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class AuthController {
    static async login(req,res){
        res.render('auth/login')
    }
    static async loginPost(req,res){
        res.render('auth/login')
    }
    static async Register(req,res){
        res.render('auth/register')
    }
}