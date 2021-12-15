const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController {
    static async dashboard(req, res) {

        const userId = req.session.userid
        try {
            const user = await User.findOne({where: {id: userId,},include: Tought,plain: true,}) 
            //console.log(user.Toughts) 
            const toughts = user.Toughts.map((result) => result.dataValues) 

            let emptyToughts = true           
            if (toughts.length > 0) {
                emptyToughts = false
            }
            
            console.log(toughts)
            console.log(emptyToughts)
            
            res.render('toughts/dashboard',{ toughts, emptyToughts })

        } catch (error) {
            res.render('toughts/dashboard', {message: 'falha ao buscar seus pensamentos!'})
            console.log(error)
            return
        }      
        
    }
    static showToughts(req,res){
        res.render('toughts/home')
    }
    static createTought(req,res){
        res.render('toughts/create')
    }
    static async createToughtSave(req, res){
        const tought = {
            title: req.body.title,
            UserId: req.session.userid,
        }
        try {
            await Tought.create(tought)
            req.flash('message', 'Pensamento criado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async updateTought(req, res) {
        const id = req.params.id
        const UserId = req.session.userid
        const tought = await Tought.findOne({where: {id: id, UserId: UserId}, raw: true})
        res.render('toughts/edit', {tought})
    }
    static async updateToughtSave(req, res){

        const id = req.body.id
        const UserId = req.session.userid
        const tought = {
            title: req.body.title
        }
        try {
            await Tought.update(tought, {where: {id: id, UserId: UserId}})
            req.flash('message', 'Pensamento atualizado com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
    static async removeTought(req, res) {

        console.log('userid:'+req.session.userid)
        const id = req.body.id
        const UserId = req.session.userid

        try {
            
            await Tought.destroy({where: {id: id, UserId: UserId}})
            req.flash('message', 'Pensamento removido com sucesso!')
            req.session.save(() => {
                res.redirect('/toughts/dashboard')
            })
        } catch (error) {
            console.log(error)
        }
    }
}