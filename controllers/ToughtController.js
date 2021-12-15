const Tought = require('../models/Tought')
const { findAll } = require('../models/User')
const User = require('../models/User')

module.exports = class ToughtController {
    static async showToughts(req,res){
        //const toughtsData = await Tought.findAll({
       // include: User,attributes: {exclude: ['password']} })
       const toughtsData = await Tought.findAll({
            include: [
                {
                    model: User,
                    attributes: {exclude: ['password','email']}
                }
            ]
        })
        //console.log(toughtsData)
        const toughts = toughtsData.map((result) => result.get({plain: true}))
        /*.get({plain: true}) joga todos os dados no mesmo array*/ 
        console.log(toughts)
        res.render('toughts/home', {toughts})
    }

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